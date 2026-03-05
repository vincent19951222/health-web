const { WebSocketServer, WebSocket } = require('ws');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

function loadLocalEnv() {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) return;

    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex <= 0) continue;
        const key = trimmed.slice(0, eqIndex).trim();
        const value = trimmed.slice(eqIndex + 1).trim();
        if (process.env[key] === undefined) {
            process.env[key] = value;
        }
    }
}

loadLocalEnv();

const ACCESS_KEY = process.env.VOLC_ASR_API_KEY;
const APP_ID = process.env.VOLC_ASR_APP_ID;
const RESOURCE_ID = process.env.VOLC_ASR_RESOURCE_ID || 'volc.seedasr.sauc.duration';
const VOLC_WS_URL = process.env.VOLC_ASR_WS_URL || 'wss://openspeech.bytedance.com/api/v3/sauc/bigmodel';
const PROXY_PORT = Number(process.env.VOLC_ASR_PROXY_PORT || 8766);

if (!ACCESS_KEY || !APP_ID) {
    console.error('ASR proxy config missing. Required: VOLC_ASR_API_KEY and VOLC_ASR_APP_ID');
    process.exit(1);
}

const wss = new WebSocketServer({ port: PROXY_PORT });
console.log(`ASR proxy listening at ws://localhost:${PROXY_PORT}`);
console.log(`ASR upstream: ${VOLC_WS_URL}`);
console.log(`ASR resource: ${RESOURCE_ID}`);

wss.on('connection', (clientWs) => {
    const connectId = randomUUID();
    const upstreamWs = new WebSocket(VOLC_WS_URL, {
        headers: {
            'X-Api-App-Key': APP_ID,
            'X-Api-Access-Key': ACCESS_KEY,
            'X-Api-Resource-Id': RESOURCE_ID,
            'X-Api-Connect-Id': connectId,
        },
    });

    upstreamWs.binaryType = 'arraybuffer';
    const pendingMessages = [];

    upstreamWs.on('open', () => {
        console.log(`[proxy] upstream connected: connect_id=${connectId}`);
        while (pendingMessages.length > 0) {
            const message = pendingMessages.shift();
            if (message) upstreamWs.send(message);
        }
    });

    clientWs.on('message', (data) => {
        if (upstreamWs.readyState === WebSocket.OPEN) {
            upstreamWs.send(data);
            return;
        }
        pendingMessages.push(data);
    });

    upstreamWs.on('message', (data) => {
        if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(data);
        }
    });

    upstreamWs.on('error', (error) => {
        console.error(`[proxy] upstream error: connect_id=${connectId} message=${error.message}`);
        if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.close(1011, 'upstream_error');
        }
    });

    upstreamWs.on('close', (code, reason) => {
        console.log(`[proxy] upstream close: connect_id=${connectId} code=${code} reason=${String(reason)}`);
        if (clientWs.readyState === WebSocket.OPEN) {
            const safeCode = (code >= 1000 && code <= 1015 && code !== 1004 && code !== 1005 && code !== 1006)
                ? code
                : 1011;
            clientWs.close(safeCode, 'upstream_closed');
        }
    });

    clientWs.on('error', (error) => {
        console.error(`[proxy] client error: connect_id=${connectId} message=${error.message}`);
        if (upstreamWs.readyState === WebSocket.OPEN || upstreamWs.readyState === WebSocket.CONNECTING) {
            upstreamWs.close();
        }
    });

    clientWs.on('close', () => {
        if (upstreamWs.readyState === WebSocket.OPEN || upstreamWs.readyState === WebSocket.CONNECTING) {
            upstreamWs.close();
        }
    });
});
