import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

/**
 * Email Verification Edge Function
 *
 * This function verifies email addresses using the token sent via email.
 * When a user clicks the verification link, this endpoint:
 * 1. Validates the token exists and hasn't expired
 * 2. Marks the email as verified in the database
 * 3. Marks the token as used
 * 4. Returns success/error response
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
        // Get token from query parameters or request body
        const url = new URL(req.url);
        let token = url.searchParams.get('token');

        if (!token && req.method === 'POST') {
            const body = await req.json();
            token = body.token;
        }

        // Validate token parameter
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'Missing verification token' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // Initialize Supabase client
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

        // 1. Look up the verification token
        const { data: tokenRecord, error: tokenError } = await supabase
            .from('verification_tokens')
            .select('*')
            .eq('token', token)
            .single();

        if (tokenError || !tokenRecord) {
            return new Response(
                JSON.stringify({ error: 'Invalid verification token' }),
                {
                    status: 404,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 2. Check if token has already been used
        if (tokenRecord.used) {
            return new Response(
                JSON.stringify({
                    error: 'This verification link has already been used',
                    already_verified: true
                }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 3. Check if token has expired
        const expiresAt = new Date(tokenRecord.expires_at);
        if (expiresAt < new Date()) {
            return new Response(
                JSON.stringify({
                    error: 'This verification link has expired. Please request a new one.',
                    expired: true
                }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 4. Update the feedback record to mark email as verified
        const { data: feedbackUpdate, error: feedbackError } = await supabase
            .from('feedback')
            .update({
                verified: true,
                verified_at: new Date().toISOString(),
            })
            .eq('email', tokenRecord.email)
            .eq('verification_token', token)
            .select()
            .single();

        if (feedbackError) {
            console.error('Failed to update feedback record:', feedbackError);
            return new Response(
                JSON.stringify({ error: 'Failed to verify email. Please contact support.' }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // 5. Mark the token as used
        const { error: tokenUpdateError } = await supabase
            .from('verification_tokens')
            .update({ used: true })
            .eq('token', token);

        if (tokenUpdateError) {
            console.error('Failed to mark token as used:', tokenUpdateError);
            // Don't fail the request - email is already verified
        }

        // 6. Return success response
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Email verified successfully! You\'ll receive updates about SafetyNet.',
                email: tokenRecord.email,
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Email verification error:', error);
        return new Response(
            JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
});
