export interface AsrTokenResponse {
    status: number;
    body: { wsUrl: string } | { error: string };
}

export function resolveAsrTokenResponse(
    env: NodeJS.ProcessEnv = process.env
): AsrTokenResponse {
    const apiKey = env.VOLC_ASR_API_KEY;
    const appId = env.VOLC_ASR_APP_ID;
    const proxyUrl = env.VOLC_ASR_PROXY_URL || 'ws://localhost:8766';

    if (!apiKey || !appId) {
        return {
            status: 500,
            body: { error: 'ASR service not configured' },
        };
    }

    return {
        status: 200,
        body: { wsUrl: proxyUrl },
    };
}
