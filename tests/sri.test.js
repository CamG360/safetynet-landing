/**
 * SRI (Subresource Integrity) Implementation Tests
 *
 * Tests verify that all external scripts have proper SRI attributes
 * to protect against CDN tampering and ensure script integrity.
 */

import { describe, test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// HTML files that should have SRI protection
const HTML_FILES = [
    'index.html',
    'visual-mockups.html',
    'placement-recommendations.html',
    'privacy.html',
    'terms.html'
];

// Expected CDN scripts with SRI
const EXPECTED_SRI_SCRIPTS = {
    'index.html': [],
    'visual-mockups.html': [
        {
            name: 'Tailwind CSS',
            src: 'https://cdn.tailwindcss.com/3.4.10',
            shouldHaveSRI: true
        }
    ],
    'placement-recommendations.html': [
        {
            name: 'Tailwind CSS',
            src: 'https://cdn.tailwindcss.com/3.4.10',
            shouldHaveSRI: true
        }
    ],
    'privacy.html': [],
    'terms.html': []
};

const LOCAL_LUCIDE_SRC = 'js/vendor/lucide.min.js';

describe('SRI Implementation Tests', () => {
    HTML_FILES.forEach(filename => {
        describe(`${filename}`, () => {
            let htmlContent;

            beforeAll(() => {
                const filePath = join(__dirname, '..', filename);
                htmlContent = readFileSync(filePath, 'utf-8');
            });

            test('should have pinned CDN versions (no @latest)', () => {
                // Check for unpinned versions
                expect(htmlContent).not.toContain('unpkg.com/lucide@latest');
                expect(htmlContent).not.toMatch(/cdn\.tailwindcss\.com(?!\/\d)/);
            });

            const expectedScripts = EXPECTED_SRI_SCRIPTS[filename] || [];

            expectedScripts.forEach(script => {
                test(`should have SRI integrity attribute for ${script.name}`, () => {
                    // Create regex to find script tag with this src
                    const scriptRegex = new RegExp(
                        `<script[^>]*src=["']${script.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
                        'i'
                    );

                    const match = htmlContent.match(scriptRegex);
                    expect(match).not.toBeNull();

                    if (match) {
                        const scriptTag = match[0];

                        // Check for integrity attribute
                        expect(scriptTag).toMatch(/integrity=["']sha\d+-[A-Za-z0-9+/=]+["']/);

                        // Check for crossorigin attribute
                        expect(scriptTag).toMatch(/crossorigin=["']anonymous["']/);
                    }
                });

                test(`should use sha384 or sha512 for ${script.name}`, () => {
                    const scriptRegex = new RegExp(
                        `<script[^>]*src=["']${script.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
                        'i'
                    );

                    const match = htmlContent.match(scriptRegex);

                    if (match) {
                        const scriptTag = match[0];
                        const integrityMatch = scriptTag.match(/integrity=["'](sha\d+)-/);

                        expect(integrityMatch).not.toBeNull();

                        if (integrityMatch) {
                            const algorithm = integrityMatch[1];
                            // SRI should use sha384 or sha512 for security
                            expect(['sha384', 'sha512']).toContain(algorithm);
                        }
                    }
                });
            });

            test('should have crossorigin attribute with SRI scripts', () => {
                const sriScripts = htmlContent.match(/<script[^>]*integrity=["'][^"']+["'][^>]*>/gi) || [];

                sriScripts.forEach(scriptTag => {
                    expect(scriptTag).toMatch(/crossorigin/i);
                });
            });

            test('should not have SRI on same-origin scripts', () => {
                // Local scripts should not have SRI (they're under our control)
                const localScriptRegex = /<script[^>]*src=["'](?!https?:\/\/)[^"']+["'][^>]*>/gi;
                const localScripts = htmlContent.match(localScriptRegex) || [];

                localScripts.forEach(scriptTag => {
                    expect(scriptTag).not.toMatch(/integrity=/i);
                });
            });

            test('should have valid base64 in integrity hashes', () => {
                const integrityRegex = /integrity=["']sha\d+-([A-Za-z0-9+/=]+)["']/gi;
                const matches = [...htmlContent.matchAll(integrityRegex)];

                matches.forEach(match => {
                    const base64Hash = match[1];

                    // Base64 should only contain valid characters
                    expect(base64Hash).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);

                    // Base64 length should be reasonable (not too short)
                    expect(base64Hash.length).toBeGreaterThan(40);
                });
            });

            test('should load Lucide locally without SRI', () => {
                expect(htmlContent).not.toMatch(/https?:\/\/[^"']*lucide/i);

                const escapedSrc = LOCAL_LUCIDE_SRC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const lucideRegex = new RegExp(
                    `<script[^>]*src=["']${escapedSrc}["'][^>]*>`,
                    'i'
                );

                const match = htmlContent.match(lucideRegex);
                expect(match).not.toBeNull();

                if (match) {
                    const scriptTag = match[0];
                    expect(scriptTag).not.toMatch(/integrity=/i);
                    expect(scriptTag).not.toMatch(/crossorigin=/i);
                }
            });
        });
    });
});

describe('SRI Security Best Practices', () => {
    HTML_FILES.forEach(filename => {
        describe(`${filename}`, () => {
            let htmlContent;

            beforeAll(() => {
                const filePath = join(__dirname, '..', filename);
                htmlContent = readFileSync(filePath, 'utf-8');
            });

            test('should use specific versions for all CDN resources', () => {
                // Check that no CDN is using @latest or unversioned URLs
                const cdnPatterns = [
                    /unpkg\.com\/[^@/]+@latest/,
                    /cdn\.jsdelivr\.net\/npm\/[^@/]+@latest/,
                    /cdnjs\.cloudflare\.com\/ajax\/libs\/[^/]+\/latest/
                ];

                cdnPatterns.forEach(pattern => {
                    expect(htmlContent).not.toMatch(pattern);
                });
            });

            test('should have SRI on all external scripts', () => {
                // Find all external script tags
                const externalScriptRegex = /<script[^>]*src=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
                const externalScripts = [...htmlContent.matchAll(externalScriptRegex)];

                // Exempt list for scripts that may not support SRI
                const sriExempt = [
                    'www.google.com/recaptcha', // reCAPTCHA dynamically loads additional scripts
                    'challenges.cloudflare.com/turnstile', // Turnstile does not provide SRI hashes
                    'fonts.googleapis.com'       // Font loading doesn't require SRI
                ];

                externalScripts.forEach(match => {
                    const scriptTag = match[0];
                    const url = match[1];

                    const isExempt = sriExempt.some(exempt => url.includes(exempt));

                    if (!isExempt) {
                        expect(scriptTag).toMatch(/integrity=/i);
                    }
                });
            });
        });
    });
});

describe('HTML Structure Validation', () => {
    HTML_FILES.forEach(filename => {
        describe(`${filename}`, () => {
            let htmlContent;

            beforeAll(() => {
                const filePath = join(__dirname, '..', filename);
                htmlContent = readFileSync(filePath, 'utf-8');
            });

            test('should have valid HTML5 doctype', () => {
                expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
            });

            test('should have properly formatted script tags', () => {
                const scriptTags = htmlContent.match(/<script[^>]*>/gi) || [];

                scriptTags.forEach(tag => {
                    // Attributes should be properly quoted
                    const attributes = tag.match(/\s+(\w+)=/g) || [];
                    attributes.forEach(attr => {
                        const attrName = attr.trim().replace('=', '');
                        const quotedRegex = new RegExp(`${attrName}=["'][^"']*["']`);
                        expect(tag).toMatch(quotedRegex);
                    });
                });
            });

            test('should not have unclosed script tags', () => {
                const openTags = (htmlContent.match(/<script[^>]*>/gi) || []).length;
                const closeTags = (htmlContent.match(/<\/script>/gi) || []).length;

                expect(openTags).toBe(closeTags);
            });
        });
    });
});
