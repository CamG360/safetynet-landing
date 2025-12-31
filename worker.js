/**
 * Cloudflare Worker for SafetyNet Waitlist
 *
 * This worker:
 * 1. Verifies Cloudflare Turnstile tokens (bot detection)
 * 2. Normalizes email addresses
 * 3. Writes to Supabase database
 *
 * Environment variables required:
 * - TURNSTILE_SECRET_KEY (Cloudflare Turnstile secret)
 * - SUPABASE_SERVICE_KEY (Supabase service_role key)
 * - SUPABASE_URL (set in wrangler.toml vars)
 */

export default {
  async fetch(request, env, ctx) {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      // Parse request body
      const body = await request.json();
      const { email, turnstileToken } = body;

      // Validate required fields
      if (!email || !turnstileToken) {
        return new Response(JSON.stringify({ error: 'Missing email or turnstileToken' }), {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Step 1: Verify Turnstile token
      const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      });

      const turnstileData = await turnstileResult.json();

      if (!turnstileData.success) {
        return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), {
          status: 403,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Step 2: Normalize email
      const normalizedEmail = email.toLowerCase().trim();

      // Step 3: Write to Supabase
      const supabaseUrl = `${env.SUPABASE_URL}/rest/v1/waitlist`;
      const supabaseResponse = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Prefer': 'resolution=ignore-duplicates',
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      // Check if database write succeeded
      if (!supabaseResponse.ok) {
        console.error('Supabase error:', await supabaseResponse.text());
        return new Response(JSON.stringify({ error: 'Database write failed' }), {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      // Success
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  }
};
