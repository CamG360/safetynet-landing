import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { submitToWaitlist } from '../js/utils.js';
import { SUPABASE_CONFIG } from '../js/config.js';

describe('submitToWaitlist', () => {
    const email = 'user@example.com';
    const mockUrl = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`;
    let fetchMock;

    beforeEach(() => {
        fetchMock = jest.fn();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete global.fetch;
    });

    it('throws on non-2xx responses and does not return success', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 500,
            json: jest.fn()
        });

        await expect(submitToWaitlist(email, SUPABASE_CONFIG)).rejects.toThrow('Waitlist submission failed with status 500');
        expect(fetchMock).toHaveBeenCalledWith(mockUrl, expect.any(Object));
    });

    it('throws when response body is not valid JSON', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => {
                throw new Error('bad json');
            })
        });

        await expect(submitToWaitlist(email, SUPABASE_CONFIG)).rejects.toThrow('Waitlist response was not valid JSON');
    });

    it('throws when acknowledgement record is missing or mismatched', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve([{ email: 'different@example.com' }]))
        });

        await expect(submitToWaitlist(email, SUPABASE_CONFIG)).rejects.toThrow('Waitlist acknowledgement missing or mismatched');
    });

    it('returns status and record when submission succeeds with a matching acknowledgement', async () => {
        const record = { email };
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve([record]))
        });

        const result = await submitToWaitlist(email, SUPABASE_CONFIG);
        expect(result).toEqual({ status: 201, record });

        const [, options] = fetchMock.mock.calls[0];
        expect(options.headers.Prefer).toBe('return=representation');
    });
});
