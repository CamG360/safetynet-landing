/**
 * Form Rate Limiting Integration Tests
 *
 * Tests for rate limiting behavior in actual form submission contexts.
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { isRateLimited, trackSubmission } from '../js/utils.js';
import { TIMING, MESSAGES } from '../js/constants.js';

describe('Form Rate Limiting Integration', () => {
    const TEST_EMAIL = 'user@example.com';
    let store = {};

    beforeEach(() => {
        // Reset store
        store = {};

        // Create localStorage mock
        const localStorageMock = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => {
                store[key] = value;
            },
            clear: () => {
                store = {};
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

    describe('Constants Configuration', () => {
        it('should have appropriate rate limit window configured', () => {
            expect(TIMING.WAITLIST_RATE_LIMIT).toBeDefined();
            expect(typeof TIMING.WAITLIST_RATE_LIMIT).toBe('number');
            expect(TIMING.WAITLIST_RATE_LIMIT).toBeGreaterThan(0);
        });

        it('should have rate limit message configured', () => {
            expect(MESSAGES.RATE_LIMIT).toBeDefined();
            expect(typeof MESSAGES.RATE_LIMIT).toBe('string');
            expect(MESSAGES.RATE_LIMIT.length).toBeGreaterThan(0);
        });

        it('should use 30 second rate limit window', () => {
            // As per the requirement, rate limit should be 30 seconds
            expect(TIMING.WAITLIST_RATE_LIMIT).toBe(30000);
        });
    });

    describe('Submission Flow', () => {
        it('should allow first submission', () => {
            const isBlocked = isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT);
            expect(isBlocked).toBe(false);
        });

        it('should block second submission within rate limit window', () => {
            // Simulate successful submission
            trackSubmission(TEST_EMAIL);

            // Attempt second submission
            const isBlocked = isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT);
            expect(isBlocked).toBe(true);
        });

        it('should allow submission after rate limit expires', () => {
            // Simulate old submission (outside window)
            // Use more margin to account for test execution time
            const oldTimestamp = Date.now() - TIMING.WAITLIST_RATE_LIMIT - 2000;
            const record = { [TEST_EMAIL]: oldTimestamp };
            store['waitlistRateLimit'] = JSON.stringify(record);

            const isBlocked = isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT);
            expect(isBlocked).toBe(false);
        });
    });

    describe('Multi-User Scenarios', () => {
        it('should independently rate limit different users', () => {
            const user1 = 'user1@example.com';
            const user2 = 'user2@example.com';
            const user3 = 'user3@example.com';

            // User 1 submits
            trackSubmission(user1);

            // User 2 submits
            trackSubmission(user2);

            // All users should be independently rate limited
            expect(isRateLimited(user1, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
            expect(isRateLimited(user2, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
            expect(isRateLimited(user3, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);
        });

        it('should handle concurrent submissions from different users', () => {
            const users = [
                'alice@example.com',
                'bob@example.com',
                'charlie@example.com',
                'diana@example.com',
            ];

            // Simulate concurrent submissions
            users.forEach(email => trackSubmission(email));

            // All should be rate limited
            users.forEach(email => {
                expect(isRateLimited(email, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
            });
        });
    });

    describe('Real-World Timing Scenarios', () => {
        it('should block submission at 15 seconds (mid-window)', () => {
            const timestamp15SecondsAgo = Date.now() - 15000;
            const record = { [TEST_EMAIL]: timestamp15SecondsAgo };
            store['waitlistRateLimit'] = JSON.stringify(record);

            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
        });

        it('should block submission at 29 seconds (near end of window)', () => {
            const timestamp29SecondsAgo = Date.now() - 29000;
            const record = { [TEST_EMAIL]: timestamp29SecondsAgo };
            store['waitlistRateLimit'] = JSON.stringify(record);

            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
        });

        it('should allow submission at 31 seconds (just after window)', () => {
            // Use more margin for test reliability
            const timestamp32SecondsAgo = Date.now() - 32000;
            const record = { [TEST_EMAIL]: timestamp32SecondsAgo };
            store['waitlistRateLimit'] = JSON.stringify(record);

            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);
        });

        it('should allow submission at 60 seconds (well after window)', () => {
            const timestamp60SecondsAgo = Date.now() - 65000;
            const record = { [TEST_EMAIL]: timestamp60SecondsAgo };
            store['waitlistRateLimit'] = JSON.stringify(record);

            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);
        });
    });

    describe('Storage Persistence', () => {
        it('should persist rate limit data across page reloads', () => {
            // Simulate submission
            trackSubmission(TEST_EMAIL);

            // Verify data is in localStorage
            const storedData = store['waitlistRateLimit'];
            expect(storedData).toBeDefined();
            const stored = JSON.parse(storedData);
            expect(stored[TEST_EMAIL]).toBeDefined();
        });

        it('should accumulate multiple email submissions in storage', () => {
            const emails = ['user1@test.com', 'user2@test.com', 'user3@test.com'];

            emails.forEach(email => trackSubmission(email));

            const storedData = store['waitlistRateLimit'];
            expect(storedData).toBeDefined();
            const stored = JSON.parse(storedData);
            expect(Object.keys(stored).length).toBe(3);
            emails.forEach(email => {
                expect(stored[email]).toBeDefined();
            });
        });
    });

    describe('Error Messages', () => {
        it('should provide user-friendly rate limit message', () => {
            expect(MESSAGES.RATE_LIMIT).not.toContain('error');
            expect(MESSAGES.RATE_LIMIT).not.toContain('Error');
            expect(MESSAGES.RATE_LIMIT.toLowerCase()).toContain('wait');
        });

        it('should have appropriate message for all error types', () => {
            expect(MESSAGES.EMAIL_REQUIRED).toBeDefined();
            expect(MESSAGES.EMAIL_INVALID).toBeDefined();
            expect(MESSAGES.RATE_LIMIT).toBeDefined();
            expect(MESSAGES.SUBMISSION_ERROR).toBeDefined();
            expect(MESSAGES.NETWORK_ERROR).toBeDefined();
        });
    });

    describe('Spam Prevention', () => {
        it('should prevent rapid-fire spam attempts', () => {
            // First submission
            trackSubmission(TEST_EMAIL);
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);

            // Immediate retry attempts (should all be blocked)
            for (let i = 0; i < 10; i++) {
                expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
            }
        });

        it('should allow legitimate re-submission after cooldown', () => {
            // Initial submission (well outside the window)
            const initialTime = Date.now() - (TIMING.WAITLIST_RATE_LIMIT + 10000);
            const record = { [TEST_EMAIL]: initialTime };
            store['waitlistRateLimit'] = JSON.stringify(record);

            // Should be allowed now
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);

            // Track new submission
            trackSubmission(TEST_EMAIL);

            // Should be rate limited again
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
        });
    });

    describe('Boundary Conditions', () => {
        it('should handle near 30 second boundary', () => {
            // Just past the boundary (allow for test execution time)
            const justPast = Date.now() - (TIMING.WAITLIST_RATE_LIMIT + 100);
            const record = { [TEST_EMAIL]: justPast };
            store['waitlistRateLimit'] = JSON.stringify(record);

            // Past boundary, should NOT be rate limited
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);
        });

        it('should handle well before 30 second boundary', () => {
            // Well before boundary
            const wellBefore = Date.now() - (TIMING.WAITLIST_RATE_LIMIT - 10000);
            const record = { [TEST_EMAIL]: wellBefore };
            store['waitlistRateLimit'] = JSON.stringify(record);

            // Before boundary, should be rate limited
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(true);
        });

        it('should handle well after 30 second boundary', () => {
            const wellAfter = Date.now() - (TIMING.WAITLIST_RATE_LIMIT + 10000);
            const record = { [TEST_EMAIL]: wellAfter };
            store['waitlistRateLimit'] = JSON.stringify(record);

            // Well after boundary, should not be rate limited
            expect(isRateLimited(TEST_EMAIL, TIMING.WAITLIST_RATE_LIMIT)).toBe(false);
        });
    });
});
