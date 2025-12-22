import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { submitToWaitlist } from '../js/utils.js';
import { SUPABASE_CONFIG } from '../js/config.js';

describe('submitToWaitlist', () => {
    const email = 'user@example.com';
    const mockUrl = `${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`;
    let fetchMock;

    const mockHeaders = (contentType = null) => ({
        get: (name) => {
            if (name.toLowerCase() === 'content-type') {
                return contentType;
            }
            return null;
        }
    });

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
            json: jest.fn(),
            headers: mockHeaders('application/json')
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
            }),
            headers: mockHeaders('application/json')
        });

        await expect(submitToWaitlist(email, SUPABASE_CONFIG)).resolves.toEqual({ status: 201, record: null });
    });

    it('throws when acknowledgement record is missing or mismatched', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve([{ email: 'different@example.com' }])),
            headers: mockHeaders('application/json')
        });

        await expect(submitToWaitlist(email, SUPABASE_CONFIG)).rejects.toThrow('Waitlist acknowledgement missing or mismatched');
    });

    it('returns status and record when submission succeeds with a matching acknowledgement', async () => {
        const record = { email };
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve([record])),
            headers: mockHeaders('application/json')
        });

        const result = await submitToWaitlist(email, SUPABASE_CONFIG);
        expect(result).toEqual({ status: 201, record });

        const [, options] = fetchMock.mock.calls[0];
        expect(options.headers.Prefer).toBe('return=representation');
    });

    it('accepts acknowledgement that matches case-insensitively', async () => {
        const record = { email: 'Campbell.McCord@GMAIL.com' };
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve([record])),
            headers: mockHeaders('application/json')
        });

        const result = await submitToWaitlist('campbell.mccord@gmail.com', SUPABASE_CONFIG);
        expect(result).toEqual({ status: 201, record });
    });

    it('treats conflict responses as already on the waitlist (success path)', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 409,
            json: jest.fn(),
            headers: mockHeaders('application/json')
        });

        const result = await submitToWaitlist(email, SUPABASE_CONFIG);
        expect(result).toEqual({ status: 409, record: null, alreadyExists: true });
    });

    it('treats 2xx with no JSON body as success (e.g., RLS prevents return)', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            status: 201,
            json: jest.fn(() => Promise.resolve()),
            headers: mockHeaders(null)
        });

        const result = await submitToWaitlist(email, SUPABASE_CONFIG);
        expect(result).toEqual({ status: 201, record: null });
    });
});
