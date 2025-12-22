/**
 * Rate Limiting Tests
 *
 * Comprehensive tests for email submission rate limiting functionality.
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { isRateLimited, trackSubmission, clearRateLimit } from '../js/utils.js';

describe('Rate Limiting Functionality', () => {
    const TEST_EMAIL = 'test@example.com';
    const TEST_EMAIL_2 = 'another@example.com';
    const RATE_LIMIT_WINDOW = 30000; // 30 seconds
    const STORAGE_KEY = 'waitlistRateLimit';

    // Mock localStorage
    let store = {};

    beforeEach(() => {
        // Reset store
        store = {};

        // Create localStorage mock that actually works
        const localStorageMock = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => {
                store[key] = value;
            },
            clear: () => {
                store = {};
            },
            removeItem: (key) => {
                delete store[key];
            },
        };

        // Properly override localStorage using defineProperty
        delete global.window;
        delete global.localStorage;

        global.window = {};
        Object.defineProperty(global.window, 'localStorage', {
            value: localStorageMock,
            writable: true,
            configurable: true
        });

        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock,
            writable: true,
            configurable: true
        });
    });

    afterEach(() => {
        store = {};
        jest.clearAllMocks();
    });

    describe('isRateLimited', () => {
        it('should return false for first-time submission', () => {
            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should return true if submitted within rate limit window', () => {
            // Simulate a recent submission
            const recentTimestamp = Date.now() - 15000; // 15 seconds ago
            const record = { [TEST_EMAIL]: recentTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(true);
        });

        it('should return false if submitted outside rate limit window', () => {
            // Simulate an old submission
            const oldTimestamp = Date.now() - 35000; // 35 seconds ago
            const record = { [TEST_EMAIL]: oldTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should return false if submitted exactly at rate limit boundary', () => {
            // Simulate submission exactly at the boundary
            const boundaryTimestamp = Date.now() - RATE_LIMIT_WINDOW;
            const record = { [TEST_EMAIL]: boundaryTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should handle multiple different emails independently', () => {
            // Email 1: recently submitted (blocked)
            // Email 2: not submitted (allowed)
            const recentTimestamp = Date.now() - 10000; // 10 seconds ago
            const record = { [TEST_EMAIL]: recentTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);
            expect(isRateLimited(TEST_EMAIL_2, RATE_LIMIT_WINDOW)).toBe(false);
        });

        it('should return false if email is empty', () => {
            const result = isRateLimited('', RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should return false if email is null', () => {
            const result = isRateLimited(null, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should return false if email is undefined', () => {
            const result = isRateLimited(undefined, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should handle corrupted localStorage data gracefully', () => {
            // Set invalid JSON in localStorage
            store[STORAGE_KEY] = 'invalid-json-data';

            // Should not throw and should return false
            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should handle localStorage being unavailable', () => {
            // Remove localStorage
            delete global.window.localStorage;

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });

        it('should handle when window is undefined', () => {
            // Remove window object
            const originalWindow = global.window;
            delete global.window;

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);

            // Restore window
            global.window = originalWindow;
        });

        it('should handle localStorage.getItem throwing an error', () => {
            // Mock getItem to throw an error
            global.window.localStorage.getItem = () => {
                throw new Error('localStorage error');
            };

            const result = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(result).toBe(false);
        });
    });

    describe('trackSubmission', () => {
        it('should store submission timestamp for email', () => {
            const beforeTime = Date.now();
            trackSubmission(TEST_EMAIL);
            const afterTime = Date.now();

            const stored = JSON.parse(store[STORAGE_KEY]);
            expect(stored[TEST_EMAIL]).toBeGreaterThanOrEqual(beforeTime);
            expect(stored[TEST_EMAIL]).toBeLessThanOrEqual(afterTime);
        });

        it('should update timestamp for subsequent submissions', () => {
            // First submission
            trackSubmission(TEST_EMAIL);
            const firstStored = JSON.parse(store[STORAGE_KEY]);
            const firstTimestamp = firstStored[TEST_EMAIL];

            // Wait a bit and submit again
            const beforeSecondSubmission = Date.now() + 100;

            // Mock Date.now for second submission
            const originalDateNow = Date.now;
            Date.now = jest.fn(() => beforeSecondSubmission);

            trackSubmission(TEST_EMAIL);
            const secondStored = JSON.parse(store[STORAGE_KEY]);
            const secondTimestamp = secondStored[TEST_EMAIL];

            expect(secondTimestamp).toBeGreaterThan(firstTimestamp);

            // Restore Date.now
            Date.now = originalDateNow;
        });

        it('should preserve other email records when tracking new submission', () => {
            // Store first email
            trackSubmission(TEST_EMAIL);
            const firstTimestamp = JSON.parse(store[STORAGE_KEY])[TEST_EMAIL];

            // Store second email
            trackSubmission(TEST_EMAIL_2);
            const stored = JSON.parse(store[STORAGE_KEY]);

            // Both should be present
            expect(stored[TEST_EMAIL]).toBe(firstTimestamp);
            expect(stored[TEST_EMAIL_2]).toBeDefined();
        });

        it('should not throw if email is empty', () => {
            expect(() => trackSubmission('')).not.toThrow();
        });

        it('should not throw if email is null', () => {
            expect(() => trackSubmission(null)).not.toThrow();
        });

        it('should not throw if email is undefined', () => {
            expect(() => trackSubmission(undefined)).not.toThrow();
        });

        it('should handle localStorage being unavailable', () => {
            delete global.window.localStorage;

            expect(() => trackSubmission(TEST_EMAIL)).not.toThrow();
        });

        it('should handle when window is undefined', () => {
            const originalWindow = global.window;
            delete global.window;

            expect(() => trackSubmission(TEST_EMAIL)).not.toThrow();

            global.window = originalWindow;
        });

        it('should handle localStorage.setItem throwing an error', () => {
            global.window.localStorage.setItem = () => {
                throw new Error('localStorage error');
            };

            expect(() => trackSubmission(TEST_EMAIL)).not.toThrow();
        });

        it('should handle corrupted existing data gracefully', () => {
            // Set invalid JSON in localStorage
            store[STORAGE_KEY] = 'invalid-json';

            // Should not throw when encountering corrupted data
            expect(() => trackSubmission(TEST_EMAIL)).not.toThrow();

            // Note: When JSON.parse fails, the catch block handles it gracefully
            // The implementation logs a warning but doesn't throw
            // The corrupted data may remain in storage (implementation handles this safely)
        });
    });

    describe('Rate Limiting Integration', () => {
        it('should block submission immediately after tracking', () => {
            // Track a submission
            trackSubmission(TEST_EMAIL);

            // Immediately check if rate limited
            const isBlocked = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(isBlocked).toBe(true);
        });

        it('should allow submission after rate limit window expires', () => {
            // Track a submission with old timestamp
            const oldTimestamp = Date.now() - (RATE_LIMIT_WINDOW + 1000);
            const record = { [TEST_EMAIL]: oldTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            // Should not be rate limited
            const isBlocked = isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW);
            expect(isBlocked).toBe(false);

            // Should be able to track new submission
            trackSubmission(TEST_EMAIL);
            const newRecord = JSON.parse(store[STORAGE_KEY]);
            expect(newRecord[TEST_EMAIL]).toBeGreaterThan(oldTimestamp);
        });

        it('should handle rapid successive submissions correctly', () => {
            // First submission
            trackSubmission(TEST_EMAIL);
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);

            // Second attempt (should still be blocked)
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);

            // Third attempt (should still be blocked)
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);
        });

        it('should handle different rate limit windows correctly', () => {
            trackSubmission(TEST_EMAIL);

            // Check with longer window (should be blocked)
            expect(isRateLimited(TEST_EMAIL, 60000)).toBe(true);

            // Check with shorter window (should be blocked within 30 seconds)
            expect(isRateLimited(TEST_EMAIL, 15000)).toBe(true);

            // To test allowing after window, set old timestamp
            const oldTimestamp = Date.now() - 100;
            const record = { [TEST_EMAIL]: oldTimestamp };
            store[STORAGE_KEY] = JSON.stringify(record);

            // Check with very short window - should be allowed
            expect(isRateLimited(TEST_EMAIL, 10)).toBe(false);
        });

        it('should maintain rate limits across multiple emails', () => {
            // Submit from email 1
            trackSubmission(TEST_EMAIL);

            // Submit from email 2
            trackSubmission(TEST_EMAIL_2);

            // Both should be rate limited independently
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);
            expect(isRateLimited(TEST_EMAIL_2, RATE_LIMIT_WINDOW)).toBe(true);

            // Verify storage has both
            const stored = JSON.parse(store[STORAGE_KEY]);
            expect(Object.keys(stored)).toHaveLength(2);
        });
    });

    describe('Edge Cases and Security', () => {
        it('should handle very long email addresses', () => {
            const longEmail = 'a'.repeat(1000) + '@example.com';

            trackSubmission(longEmail);
            expect(isRateLimited(longEmail, RATE_LIMIT_WINDOW)).toBe(true);
        });

        it('should handle special characters in email', () => {
            const specialEmail = 'test+special!#$%&\'*+-/=?^_`{|}~@example.com';

            trackSubmission(specialEmail);
            expect(isRateLimited(specialEmail, RATE_LIMIT_WINDOW)).toBe(true);
        });

        it('should handle zero as rate limit window', () => {
            trackSubmission(TEST_EMAIL);

            // With 0ms window, should always be allowed
            expect(isRateLimited(TEST_EMAIL, 0)).toBe(false);
        });

        it('should handle negative rate limit window', () => {
            trackSubmission(TEST_EMAIL);

            // With negative window, should always be allowed
            expect(isRateLimited(TEST_EMAIL, -1000)).toBe(false);
        });

        it('should handle extremely large rate limit window', () => {
            trackSubmission(TEST_EMAIL);

            // With very large window, should be blocked
            expect(isRateLimited(TEST_EMAIL, Number.MAX_SAFE_INTEGER)).toBe(true);
        });

        it('should handle case sensitivity in emails', () => {
            const email1 = 'Test@Example.com';
            const email2 = 'test@example.com';

            trackSubmission(email1);

            // Should treat as different emails (case sensitive)
            expect(isRateLimited(email1, RATE_LIMIT_WINDOW)).toBe(true);
            expect(isRateLimited(email2, RATE_LIMIT_WINDOW)).toBe(false);
        });
    });

    describe('clearRateLimit', () => {
        it('should clear rate limit for a specific email', () => {
            // Track submission
            trackSubmission(TEST_EMAIL);
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);

            // Clear rate limit
            clearRateLimit(TEST_EMAIL);

            // Should no longer be rate limited
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(false);
        });

        it('should only clear rate limit for specified email', () => {
            // Track multiple submissions
            trackSubmission(TEST_EMAIL);
            trackSubmission(TEST_EMAIL_2);

            // Both should be rate limited
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(true);
            expect(isRateLimited(TEST_EMAIL_2, RATE_LIMIT_WINDOW)).toBe(true);

            // Clear only first email
            clearRateLimit(TEST_EMAIL);

            // First should be cleared, second still limited
            expect(isRateLimited(TEST_EMAIL, RATE_LIMIT_WINDOW)).toBe(false);
            expect(isRateLimited(TEST_EMAIL_2, RATE_LIMIT_WINDOW)).toBe(true);
        });

        it('should handle clearing non-existent email gracefully', () => {
            // Should not throw when clearing email that was never tracked
            expect(() => clearRateLimit('nonexistent@example.com')).not.toThrow();
        });

        it('should handle empty email', () => {
            expect(() => clearRateLimit('')).not.toThrow();
        });

        it('should handle null/undefined', () => {
            expect(() => clearRateLimit(null)).not.toThrow();
            expect(() => clearRateLimit(undefined)).not.toThrow();
        });
    });

    describe('Failed Submission Scenario - Critical Fix', () => {
        it('should NOT rate-limit users after failed submission', () => {
            // Simulate a user attempting submission
            const email = 'user@example.com';

            // Initially, user is not rate limited
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);

            // Simulate submission flow where submission FAILS
            // In the catch block, clearRateLimit should be called
            clearRateLimit(email); // This happens in catch block

            // User should still not be rate limited
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);

            // User should be able to retry immediately
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);
        });

        it('should clear stale rate limit from previous failed submission', () => {
            const email = 'user@example.com';

            // Simulate a scenario where trackSubmission was incorrectly called
            // (e.g., from old buggy code or corrupted localStorage)
            trackSubmission(email);
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(true);

            // When submission fails, clearRateLimit should be called in catch block
            clearRateLimit(email);

            // User should now be able to retry
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);
        });

        it('should handle complete failure-then-retry workflow', () => {
            const email = 'user@example.com';

            // Attempt 1: Submission fails
            // No trackSubmission called (because response.ok was false)
            // clearRateLimit called in catch block
            clearRateLimit(email);
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);

            // Attempt 2: User retries immediately, submission succeeds
            trackSubmission(email); // Now tracked because submission succeeded
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(true);

            // Attempt 3: User tries again (should be blocked)
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(true);
        });

        it('should allow immediate retry after clearing rate limit', () => {
            const email = 'user@example.com';

            // Track a submission
            trackSubmission(email);
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(true);

            // Submission fails, clear rate limit
            clearRateLimit(email);

            // Should be able to retry immediately
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(false);

            // Successful retry
            trackSubmission(email);
            expect(isRateLimited(email, RATE_LIMIT_WINDOW)).toBe(true);
        });
    });
});
