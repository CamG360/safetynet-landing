import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { createBrotliCompress, createGzip, constants as zlibConstants } from 'node:zlib';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 8123);
const host = process.env.HOST || '127.0.0.1';

const mimeTypes = {
    '.avif': 'image/avif',
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.woff2': 'font/woff2',
};
const compressibleExtensions = new Set(['.css', '.html', '.js', '.json']);

createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const relativePath = normalize(requestPath === '/' ? 'index.html' : requestPath.slice(1));
    const filePath = resolve(join(root, relativePath));

    if (!filePath.startsWith(`${root}\\`) && filePath !== root) {
        response.writeHead(403).end('Forbidden');
        return;
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        response.writeHead(404).end('Not found');
        return;
    }

    const extension = extname(filePath).toLowerCase();
    const headers = {
        'Cache-Control': 'no-store',
        'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    };
    const acceptedEncodings = request.headers['accept-encoding'] || '';
    const source = createReadStream(filePath);

    if (compressibleExtensions.has(extension) && acceptedEncodings.includes('br')) {
        response.writeHead(200, { ...headers, 'Content-Encoding': 'br', Vary: 'Accept-Encoding' });
        source.pipe(createBrotliCompress({
            params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 4 },
        })).pipe(response);
    } else if (compressibleExtensions.has(extension) && acceptedEncodings.includes('gzip')) {
        response.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
        source.pipe(createGzip({ level: 6 })).pipe(response);
    } else {
        response.writeHead(200, headers);
        source.pipe(response);
    }
}).listen(port, host, () => {
    console.log(`SafetyNet test server listening at http://${host}:${port}`);
});
