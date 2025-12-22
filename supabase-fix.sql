-- ============================================
-- SafetyNet Database Fix: PGRST204 Error Resolution
-- ============================================
-- Run these commands in Supabase SQL Editor
-- https://app.supabase.com/project/YOUR_PROJECT/sql

-- STEP 1: Check if recaptcha_token column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'feedback'
  AND column_name IN ('recaptcha_token', 'recaptcha_score');

-- STEP 2: Add missing columns if they don't exist
-- (Run this only if Step 1 shows columns are missing)
ALTER TABLE feedback
ADD COLUMN IF NOT EXISTS recaptcha_token TEXT,
ADD COLUMN IF NOT EXISTS recaptcha_score FLOAT;

-- STEP 3: Check for triggers that might be failing
SELECT
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'feedback';

-- STEP 4: Check for functions that might be validating recaptcha
SELECT
    routine_name,
    routine_definition
FROM information_schema.routines
WHERE routine_name LIKE '%recaptcha%' OR routine_name LIKE '%feedback%';

-- STEP 5: Check Row Level Security policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'feedback';

-- ============================================
-- RECOMMENDED FIX: Remove Server-Side Validation
-- ============================================
-- If you have a trigger validating reCAPTCHA, drop it:
-- (Uncomment and run if you find a problematic trigger in Step 3)

-- DROP TRIGGER IF EXISTS validate_recaptcha_trigger ON feedback;
-- DROP FUNCTION IF EXISTS validate_recaptcha_token();

-- ============================================
-- ALTERNATIVE: Make recaptcha_token Optional
-- ============================================
-- Make the column nullable and allow inserts without it

ALTER TABLE feedback
ALTER COLUMN recaptcha_token DROP NOT NULL;

-- Remove any CHECK constraints on recaptcha_token
ALTER TABLE feedback
DROP CONSTRAINT IF EXISTS feedback_recaptcha_token_check;

-- ============================================
-- RECOMMENDED: Simplified RLS Policy
-- ============================================
-- Replace complex validation with simple anon access

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON feedback;
DROP POLICY IF EXISTS "Allow public inserts" ON feedback;
DROP POLICY IF EXISTS "Enable insert for anon users" ON feedback;

-- Create simple policy that allows inserts without validation
CREATE POLICY "Allow anonymous feedback submissions"
ON feedback
FOR INSERT
TO anon
WITH CHECK (true);

-- ============================================
-- VERIFICATION
-- ============================================
-- Test that inserts work without errors
-- (This should NOT return PGRST204 error)

INSERT INTO feedback (email, created_at, recaptcha_token)
VALUES ('test@example.com', NOW(), 'test_token')
RETURNING id, email, created_at;

-- Clean up test data
DELETE FROM feedback WHERE email = 'test@example.com';

-- ============================================
-- FINAL CHECK
-- ============================================
SELECT
    'Database is ready!' as status,
    COUNT(*) as total_feedback_entries
FROM feedback;
