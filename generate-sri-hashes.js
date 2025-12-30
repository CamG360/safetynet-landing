#!/usr/bin/env node

import https from 'https';
import http from 'http';
import crypto from 'crypto';
import { URL } from 'url';

const resources = [
    {
        name: 'Tailwind CSS 3.4.10',
        url: 'https://cdn.tailwindcss.com/3.4.10'
    }
];

function fetchAndHash(url, name) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;

        console.log(`\n📥 Fetching ${name}...`);
        console.log(`   URL: ${url}`);

        client.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                console.log(`   ↪️  Redirect to: ${res.headers.location}`);
                return fetchAndHash(res.headers.location, name).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                return;
            }

            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);

                // Generate hashes for multiple algorithms
                const sha256 = crypto.createHash('sha256').update(buffer).digest('base64');
                const sha384 = crypto.createHash('sha384').update(buffer).digest('base64');
                const sha512 = crypto.createHash('sha512').update(buffer).digest('base64');

                console.log(`   ✅ Downloaded: ${buffer.length} bytes`);
                console.log(`   Preview: ${buffer.toString('utf8', 0, 80)}...`);

                resolve({
                    name,
                    url,
                    size: buffer.length,
                    sha256: `sha256-${sha256}`,
                    sha384: `sha384-${sha384}`,
                    sha512: `sha512-${sha512}`
                });
            });
            res.on('error', reject);
        }).on('error', reject);
    });
}

async function main() {
    console.log('🔐 SRI Hash Generator');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
        const results = [];

        for (const resource of resources) {
            const result = await fetchAndHash(resource.url, resource.name);
            results.push(result);
        }

        console.log('\n\n📊 SRI HASH RESULTS');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        results.forEach(result => {
            console.log(`\n${result.name}`);
            console.log(`URL: ${result.url}`);
            console.log(`Size: ${result.size} bytes`);
            console.log(`\nRecommended (SHA-384):`);
            console.log(`integrity="${result.sha384}"`);
            console.log(`\nAlternatives:`);
            console.log(`SHA-256: integrity="${result.sha256}"`);
            console.log(`SHA-512: integrity="${result.sha512}"`);
            console.log('─'.repeat(70));
        });

        console.log('\n\n📝 HTML SCRIPT TAGS:\n');

        results.forEach(result => {
            console.log(`<!-- ${result.name} -->`);
            console.log(`<script`);
            console.log(`    src="${result.url}"`);
            console.log(`    integrity="${result.sha384}"`);
            console.log(`    crossorigin="anonymous"`);
            console.log(`></script>\n`);
        });

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Hash generation complete!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
