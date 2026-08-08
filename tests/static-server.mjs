import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createGzip, constants as zlibConstants } from 'node:zlib';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 18123);
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

const server = createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);

    if (requestPath === '/__health') {
        response.writeHead(204, { 'Cache-Control': 'no-store' }).end();
        return;
    }

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
    const handleStreamError = (error) => {
        if (!error) return;
        console.error(`Failed to serve ${requestPath}:`, error);
        if (!response.headersSent) response.writeHead(500);
        response.destroy();
    };

    if (compressibleExtensions.has(extension) && acceptedEncodings.includes('br')) {
        response.writeHead(200, { ...headers, 'Content-Encoding': 'br', Vary: 'Accept-Encoding' });
        pipeline(source, createBrotliCompress({
            params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 4 },
        }), response, handleStreamError);
    } else if (compressibleExtensions.has(extension) && acceptedEncodings.includes('gzip')) {
        response.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
        pipeline(source, createGzip({ level: 6 }), response, handleStreamError);
    } else {
        response.writeHead(200, headers);
        pipeline(source, response, handleStreamError);
    }
});

server.on('error', (error) => {
    console.error(`SafetyNet test server failed on http://${host}:${port}:`, error);
    process.exitCode = 1;
});

server.listen(port, host, () => {
    process.stdout.write(`SafetyNet test server listening at http://${host}:${port}\n`);
});

let shuttingDown = false;

function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    process.stdout.write(`SafetyNet test server received ${signal}; shutting down\n`);

    const forceExit = setTimeout(() => {
        console.error('SafetyNet test server shutdown timed out');
        process.exit(1);
    }, 5_000);
    forceExit.unref();

    server.close((error) => {
        clearTimeout(forceExit);
        if (error) {
            console.error('SafetyNet test server failed to shut down:', error);
            process.exit(1);
        }
        process.exit(0);
    });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
