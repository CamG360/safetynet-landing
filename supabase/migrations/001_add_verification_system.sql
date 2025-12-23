-- Migration: Add Email Verification System
-- Description: Adds verification tokens, rate limiting, and email verification tracking
-- Created: 2025-12-23

-- =============================================
-- 1. Update feedback table for verification
-- =============================================

-- Add verification-related columns to feedback table
ALTER TABLE feedback
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_feedback_verification_token
ON feedback(verification_token)
WHERE verification_token IS NOT NULL;

-- Add index for email lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_feedback_email
ON feedback(email);

-- Add unique constraint on email (if not exists)
-- Note: This may fail if duplicate emails already exist
-- In that case, clean up duplicates first
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'feedback_email_unique'
    ) THEN
        ALTER TABLE feedback ADD CONSTRAINT feedback_email_unique UNIQUE (email);
    END IF;
END$$;

-- =============================================
-- 2. Create verification_tokens table
-- =============================================

CREATE TABLE IF NOT EXISTS verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for verification_tokens table
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token
ON verification_tokens(token);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_email
ON verification_tokens(email);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_used
ON verification_tokens(used)
WHERE used = false;

-- =============================================
-- 3. Create rate_limits table
-- =============================================

CREATE TABLE IF NOT EXISTS rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier TEXT NOT NULL,           -- email or IP address
    type TEXT NOT NULL,                 -- 'email' or 'ip'
    count INTEGER DEFAULT 1,            -- number of submissions
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Composite unique constraint for identifier + type
CREATE UNIQUE INDEX IF NOT EXISTS idx_rate_limits_identifier_type
ON rate_limits(identifier, type);

-- Index for window queries
CREATE INDEX IF NOT EXISTS idx_rate_limits_window
ON rate_limits(window_start);

-- =============================================
-- 4. Create cleanup function for expired tokens
-- =============================================

-- Function to clean up expired verification tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM verification_tokens
    WHERE expires_at < NOW() AND used = false;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 5. Create cleanup function for old rate limits
-- =============================================

-- Function to clean up old rate limit records (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM rate_limits
    WHERE window_start < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 6. Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on verification_tokens table
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to read verification tokens (for verification)
CREATE POLICY "Allow anonymous read for verification"
ON verification_tokens
FOR SELECT
TO anon
USING (true);

-- Policy: Only service role can insert/update/delete
CREATE POLICY "Only service role can modify tokens"
ON verification_tokens
FOR ALL
TO service_role
USING (true);

-- Enable RLS on rate_limits table
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access rate_limits
CREATE POLICY "Only service role can access rate limits"
ON rate_limits
FOR ALL
TO service_role
USING (true);

-- =============================================
-- 7. Comments for documentation
-- =============================================

COMMENT ON TABLE verification_tokens IS 'Stores email verification tokens for waitlist signups';
COMMENT ON COLUMN verification_tokens.email IS 'Email address to verify';
COMMENT ON COLUMN verification_tokens.token IS 'Unique verification token (UUID)';
COMMENT ON COLUMN verification_tokens.expires_at IS 'Token expiration time (24 hours from creation)';
COMMENT ON COLUMN verification_tokens.used IS 'Whether the token has been used';

COMMENT ON TABLE rate_limits IS 'Tracks submission rate limits by email and IP address';
COMMENT ON COLUMN rate_limits.identifier IS 'Email address or IP address';
COMMENT ON COLUMN rate_limits.type IS 'Type of identifier: email or ip';
COMMENT ON COLUMN rate_limits.count IS 'Number of submissions within the current window';
COMMENT ON COLUMN rate_limits.window_start IS 'Start of the current rate limit window';

COMMENT ON COLUMN feedback.verification_token IS 'Token used to verify this email address';
COMMENT ON COLUMN feedback.verified IS 'Whether the email address has been verified';
COMMENT ON COLUMN feedback.verified_at IS 'Timestamp when email was verified';
COMMENT ON COLUMN feedback.ip_address IS 'IP address of the submission';

-- =============================================
-- 8. Optional: Create scheduled jobs (via pg_cron)
-- =============================================

-- Note: pg_cron needs to be enabled in Supabase dashboard first
-- These are example cron jobs - uncomment if pg_cron is available

-- Clean up expired tokens daily at 2 AM
-- SELECT cron.schedule(
--     'cleanup-expired-tokens',
--     '0 2 * * *',
--     'SELECT cleanup_expired_tokens();'
-- );

-- Clean up old rate limits weekly on Sunday at 3 AM
-- SELECT cron.schedule(
--     'cleanup-old-rate-limits',
--     '0 3 * * 0',
--     'SELECT cleanup_old_rate_limits();'
-- );

-- =============================================
-- 9. Grant permissions
-- =============================================

-- Grant necessary permissions to service role
GRANT ALL ON verification_tokens TO service_role;
GRANT ALL ON rate_limits TO service_role;

-- Grant read access to anon for verification
GRANT SELECT ON verification_tokens TO anon;
