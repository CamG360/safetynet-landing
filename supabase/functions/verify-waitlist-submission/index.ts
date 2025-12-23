import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { isDisposableDomain } from './disposable-domains.ts';

// Cloudflare Turnstile verification endpoint
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Environment variables
const TURNSTILE_SECRET = Deno.env.get('TURNSTILE_SECRET_KEY') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Rate limit configuration
const RATE_LIMIT_EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_EMAIL_MAX = 1; // 1 submission per email per 24 hours
const RATE_LIMIT_IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_IP_MAX = 5; // 5 submissions per IP per hour

interface TurnstileVerifyResponse {
    success: boolean;
    'error-codes'?: string[];
    challenge_ts?: string;
    hostname?: string;
}

interface RateLimitRecord {
    identifier: string;
    type: 'email' | 'ip';
    count: number;
    window_start: string;
}

/**
 * Verify Turnstile token with Cloudflare API
 */
async function verifyTurnstileToken(token: string, remoteIp: string): Promise<TurnstileVerifyResponse> {
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', token);
    formData.append('remoteip', remoteIp);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });

    return await response.json();
}

/**
 * Check rate limits for email and IP
 */
async function checkRateLimit(
    supabase: any,
    identifier: string,
    type: 'email' | 'ip',
    windowMs: number,
    maxCount: number
): Promise<{ limited: boolean; count: number }> {
    const windowStart = new Date(Date.now() - windowMs).toISOString();

    // Query recent submissions within the time window
    const { data, error } = await supabase
        .from('rate_limits')
        .select('count')
        .eq('identifier', identifier)
        .eq('type', type)
        .gte('window_start', windowStart)
        .single();

    if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned", which is fine
        console.error('Rate limit check error:', error);
        return { limited: false, count: 0 };
    }

    const currentCount = data?.count || 0;
    return {
        limited: currentCount >= maxCount,
        count: currentCount,
    };
}

/**
 * Update rate limit counter
 */
async function updateRateLimit(
    supabase: any,
    identifier: string,
    type: 'email' | 'ip'
): Promise<void> {
    const windowStart = new Date().toISOString();

    // Try to increment existing record or create new one
    const { error } = await supabase
        .from('rate_limits')
        .upsert({
            identifier,
            type,
            count: 1,
            window_start: windowStart,
        }, {
            onConflict: 'identifier,type',
            ignoreDuplicates: false,
        });

    if (error) {
        // If upsert fails, try incrementing existing record
        const { data: existing } = await supabase
            .from('rate_limits')
            .select('count')
            .eq('identifier', identifier)
            .eq('type', type)
            .single();

        if (existing) {
            await supabase
                .from('rate_limits')
                .update({ count: existing.count + 1 })
                .eq('identifier', identifier)
                .eq('type', type);
        }
    }
}

/**
 * Generate verification token and store it
 */
async function createVerificationToken(
    supabase: any,
    email: string
): Promise<string> {
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    const { error } = await supabase
        .from('verification_tokens')
        .insert({
            email,
            token,
            expires_at: expiresAt.toISOString(),
            used: false,
        });

    if (error) {
        console.error('Failed to create verification token:', error);
        throw new Error('Failed to create verification token');
    }

    return token;
}

/**
 * Send verification email
 */
async function sendVerificationEmail(
    email: string,
    verificationToken: string
): Promise<void> {
    // For now, we'll log the verification link
    // In production, you would use Supabase Auth or a transactional email service
    const verificationLink = `https://your-domain.com/verify-email?token=${verificationToken}`;

    console.log(`Verification email for ${email}: ${verificationLink}`);

    // TODO: Implement actual email sending using:
    // 1. Supabase Auth email templates
    // 2. SendGrid, Postmark, or Resend API
    // 3. AWS SES
    //
    // Example with fetch to a transactional email API:
    // await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${RESEND_API_KEY}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         from: 'SafetyNet <noreply@safetynetbeta.com>',
    //         to: email,
    //         subject: 'Confirm your spot on the SafetyNet waitlist',
    //         html: `
    //             <h1>Welcome to SafetyNet!</h1>
    //             <p>Click the link below to confirm your spot on the waitlist:</p>
    //             <a href="${verificationLink}">Verify Email</a>
    //         `
    //     })
    // });
}

/**
 * Main handler function
 */
serve(async (req) => {
    // CORS headers for all responses
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Parse request body
        const { email, turnstile_token } = await req.json();

        // Get client IP
        const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
                         req.headers.get('x-real-ip') ||
                         'unknown';

        // 1. Validate input
        if (!email || !turnstile_token) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: email and turnstile_token' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 3. Check for disposable email
        const domain = email.split('@')[1]?.toLowerCase();
        if (domain && isDisposableDomain(domain)) {
            return new Response(
                JSON.stringify({ error: 'Disposable email addresses are not allowed' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 4. Verify Turnstile token
        const turnstileResult = await verifyTurnstileToken(turnstile_token, clientIp);

        if (!turnstileResult.success) {
            console.error('Turnstile verification failed:', turnstileResult['error-codes']);
            return new Response(
                JSON.stringify({ error: 'Bot verification failed. Please try again.' }),
                {
                    status: 403,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 5. Initialize Supabase client
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

        // 6. Check email rate limit
        const emailRateLimit = await checkRateLimit(
            supabase,
            email,
            'email',
            RATE_LIMIT_EMAIL_WINDOW_MS,
            RATE_LIMIT_EMAIL_MAX
        );

        if (emailRateLimit.limited) {
            return new Response(
                JSON.stringify({ error: 'You\'ve already joined the waitlist. Check your email for verification.' }),
                {
                    status: 429,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 7. Check IP rate limit
        const ipRateLimit = await checkRateLimit(
            supabase,
            clientIp,
            'ip',
            RATE_LIMIT_IP_WINDOW_MS,
            RATE_LIMIT_IP_MAX
        );

        if (ipRateLimit.limited) {
            return new Response(
                JSON.stringify({ error: 'Too many submissions from this location. Please try again later.' }),
                {
                    status: 429,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 8. Generate verification token
        const verificationToken = await createVerificationToken(supabase, email);

        // 9. Insert into database
        const { data, error } = await supabase
            .from('feedback')
            .insert({
                email,
                verification_token: verificationToken,
                verified: false,
                ip_address: clientIp,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Database insertion error:', error);

            // Check if email already exists
            if (error.code === '23505') { // Unique constraint violation
                return new Response(
                    JSON.stringify({ error: 'This email is already on the waitlist.' }),
                    {
                        status: 409,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    }
                );
            }

            throw error;
        }

        // 10. Update rate limits
        await Promise.all([
            updateRateLimit(supabase, email, 'email'),
            updateRateLimit(supabase, clientIp, 'ip'),
        ]);

        // 11. Send verification email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            // Don't fail the request if email sending fails
            // The user is already in the database
        }

        // 12. Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: 'You\'re on the waitlist! Check your email to confirm your spot.',
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Edge function error:', error);
        return new Response(
            JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
});
