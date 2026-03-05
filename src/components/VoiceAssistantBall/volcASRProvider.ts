import type { ASRProvider, ASRResult } from './webSpeechProvider';

const PROTOCOL_VERSION = 0x01;
const HEADER_SIZE = 0x01;
const MSG_TYPE_FULL_CLIENT = 0x01;
const MSG_TYPE_AUDIO_ONLY = 0x02;
const MSG_TYPE_ERROR = 0x0f;

const MSG_FLAG_NONE = 0x00;
const MSG_FLAG_HAS_SEQ = 0x01;
const MSG_FLAG_LAST_NO_SEQ = 0x02;
const MSG_FLAG_LAST_WITH_SEQ = 0x03;

const SERIALIZATION_JSON = 0x01;
const COMPRESSION_NONE = 0x00;

const AUDIO_SAMPLE_RATE = 16000;
const AUDIO_CHUNK_MS = 100;
const MAX_RECONNECT_ATTEMPTS = 3;

function buildHeader(msgType: number, msgFlag: number): Uint8Array {
    return new Uint8Array([
        (PROTOCOL_VERSION << 4) | HEADER_SIZE,
        (msgType << 4) | msgFlag,
        (SERIALIZATION_JSON << 4) | COMPRESSION_NONE,
        0x00,
    ]);
}

function buildFrame(header: Uint8Array, payload: Uint8Array): ArrayBuffer {
    const buffer = new ArrayBuffer(header.length + 4 + payload.length);
    const view = new DataView(buffer);

    for (let index = 0; index < header.length; index++) {
        view.setUint8(index, header[index]);
    }

    view.setUint32(header.length, payload.length, false);

    const destination = new Uint8Array(buffer);
    destination.set(payload, header.length + 4);
    return buffer;
}

export function buildFullClientRequest(uid: string): ArrayBuffer {
    const json = JSON.stringify({
        user: { uid },
        audio: {
            format: 'pcm',
            codec: 'raw',
            rate: AUDIO_SAMPLE_RATE,
            bits: 16,
            channel: 1,
        },
        request: {
            model_name: 'bigmodel',
            enable_itn: true,
            enable_punc: true,
            result_type: 'full',
        },
    });

    const payload = new TextEncoder().encode(json);
    const header = buildHeader(MSG_TYPE_FULL_CLIENT, MSG_FLAG_NONE);
    return buildFrame(header, payload);
}

export function buildAudioRequest(pcmData: Int16Array, _sequence: number, isLast: boolean): ArrayBuffer {
    const flag = isLast ? MSG_FLAG_LAST_NO_SEQ : MSG_FLAG_NONE;
    const header = buildHeader(MSG_TYPE_AUDIO_ONLY, flag);
    const payloadBytes = new Uint8Array(pcmData.buffer, pcmData.byteOffset, pcmData.byteLength);
    return buildFrame(header, payloadBytes);
}

interface VolcResponse {
    result?: {
        text?: string;
        utterances?: Array<{ definite?: boolean; text?: string }>;
    };
    code?: number;
    message?: string;
}

export function parseServerResponse(data: ArrayBuffer): VolcResponse | null {
    try {
        if (data.byteLength < 8) return null;

        const view = new DataView(data);
        const msgType = (view.getUint8(1) >> 4) & 0x0f;
        if (msgType === MSG_TYPE_ERROR) return null;

        const msgFlag = view.getUint8(1) & 0x0f;
        const hasSequence = msgFlag === MSG_FLAG_HAS_SEQ || msgFlag === MSG_FLAG_LAST_WITH_SEQ;
        const payloadSizeOffset = hasSequence ? 8 : 4;
        const payloadStart = payloadSizeOffset + 4;

        if (data.byteLength < payloadStart) return null;

        const payloadSize = view.getUint32(payloadSizeOffset, false);
        const available = data.byteLength - payloadStart;
        if (payloadSize === 0 || payloadSize > available) return null;

        const rawPayload = new Uint8Array(data, payloadStart, payloadSize);
        const jsonString = new TextDecoder().decode(rawPayload);
        return JSON.parse(jsonString) as VolcResponse;
    } catch {
        return null;
    }
}

function downsamplePCM(input: Float32Array, fromRate: number, toRate: number): Int16Array {
    if (fromRate === toRate) {
        const output = new Int16Array(input.length);
        for (let index = 0; index < input.length; index++) {
            output[index] = Math.max(-32768, Math.min(32767, Math.round(input[index] * 32767)));
        }
        return output;
    }

    const ratio = fromRate / toRate;
    const outputLength = Math.ceil(input.length / ratio);
    const output = new Int16Array(outputLength);

    for (let index = 0; index < outputLength; index++) {
        const sourceIndex = index * ratio;
        const low = Math.floor(sourceIndex);
        const high = Math.min(low + 1, input.length - 1);
        const fraction = sourceIndex - low;
        const sample = input[low] * (1 - fraction) + input[high] * fraction;
        output[index] = Math.max(-32768, Math.min(32767, Math.round(sample * 32767)));
    }

    return output;
}

export class VolcASRProvider implements ASRProvider {
    private ws: WebSocket | null = null;
    private audioContext: AudioContext | null = null;
    private mediaStream: MediaStream | null = null;
    private processorNode: ScriptProcessorNode | null = null;
    private isActive = false;
    private sequence = 1;
    private reconnectCount = 0;
    private wsUrl = '';
    private onResultCb: ((result: ASRResult) => void) | null = null;
    private onErrorCb: ((error: string) => void) | null = null;
    private pcmBuffer: Int16Array[] = [];
    private chunkTimer: ReturnType<typeof setInterval> | null = null;

    isSupported(): boolean {
        return typeof window !== 'undefined' &&
            !!navigator.mediaDevices?.getUserMedia &&
            typeof WebSocket !== 'undefined';
    }

    async start(
        onResult: (result: ASRResult) => void,
        onError: (error: string) => void
    ): Promise<void> {
        this.onResultCb = onResult;
        this.onErrorCb = onError;
        this.isActive = true;
        this.reconnectCount = 0;

        try {
            const response = await fetch('/api/asr-token');
            if (!response.ok) {
                this.isActive = false;
                onError('asr_not_configured');
                return;
            }

            const { wsUrl } = await response.json() as { wsUrl: string };
            this.wsUrl = wsUrl;

            await this.initAudio();
            this.connectWebSocket();
        } catch (error) {
            if ((error as DOMException)?.name === 'NotAllowedError') {
                onError('permission_denied');
            } else {
                onError('start_failed');
            }
            this.isActive = false;
        }
    }

    private async initAudio(): Promise<void> {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: { sampleRate: AUDIO_SAMPLE_RATE, channelCount: 1, echoCancellation: true },
        });

        this.audioContext = new AudioContext();
        const sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.processorNode = this.audioContext.createScriptProcessor(4096, 1, 1);

        this.processorNode.onaudioprocess = (event: AudioProcessingEvent) => {
            if (!this.isActive || !this.audioContext) return;

            const floatData = event.inputBuffer.getChannelData(0);
            const pcm = downsamplePCM(floatData, this.audioContext.sampleRate, AUDIO_SAMPLE_RATE);
            this.pcmBuffer.push(pcm);
        };

        sourceNode.connect(this.processorNode);
        this.processorNode.connect(this.audioContext.destination);
    }

    private connectWebSocket(): void {
        this.ws = new WebSocket(this.wsUrl);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onopen = () => {
            this.reconnectCount = 0;
            this.sequence = 1;

            const request = buildFullClientRequest(`user-${Date.now()}`);
            this.ws?.send(request);
            this.startChunkTimer();
        };

        this.ws.onmessage = (event: MessageEvent) => {
            const response = parseServerResponse(event.data as ArrayBuffer);
            if (!response || response.code !== undefined) return;

            const text = response.result?.text ?? '';
            if (!text) return;

            const utterances = response.result?.utterances ?? [];
            const isFinal = utterances.some((item) => item.definite === true);
            this.onResultCb?.({ text, isFinal });
        };

        this.ws.onerror = () => {
            this.handleDisconnect();
        };

        this.ws.onclose = () => {
            if (this.isActive) {
                this.handleDisconnect();
            }
        };
    }

    private startChunkTimer(): void {
        this.chunkTimer = setInterval(() => {
            if (!this.isActive || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;
            if (this.pcmBuffer.length === 0) return;

            const totalLength = this.pcmBuffer.reduce((sum, chunk) => sum + chunk.length, 0);
            const merged = new Int16Array(totalLength);
            let offset = 0;
            for (const chunk of this.pcmBuffer) {
                merged.set(chunk, offset);
                offset += chunk.length;
            }
            this.pcmBuffer = [];

            const frame = buildAudioRequest(merged, this.sequence++, false);
            this.ws.send(frame);
        }, AUDIO_CHUNK_MS);
    }

    private handleDisconnect(): void {
        this.stopChunkTimer();
        if (!this.isActive) return;

        if (this.reconnectCount < MAX_RECONNECT_ATTEMPTS) {
            this.reconnectCount++;
            setTimeout(() => this.connectWebSocket(), 500 * this.reconnectCount);
            return;
        }

        this.isActive = false;
        this.onErrorCb?.('connection_failed');
    }

    private stopChunkTimer(): void {
        if (!this.chunkTimer) return;
        clearInterval(this.chunkTimer);
        this.chunkTimer = null;
    }

    stop(): void {
        this.isActive = false;
        this.stopChunkTimer();

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                const remaining = this.collectRemainingPCM();
                const lastFrame = buildAudioRequest(remaining, this.sequence++, true);
                this.ws.send(lastFrame);
            } catch {
                // ignore
            }

            setTimeout(() => {
                this.ws?.close();
                this.ws = null;
            }, 300);
        } else {
            this.ws = null;
        }

        this.processorNode?.disconnect();
        this.processorNode = null;
        this.audioContext?.close();
        this.audioContext = null;
        this.mediaStream?.getTracks().forEach((track) => track.stop());
        this.mediaStream = null;
        this.pcmBuffer = [];
    }

    private collectRemainingPCM(): Int16Array {
        if (this.pcmBuffer.length === 0) return new Int16Array(0);

        const totalLength = this.pcmBuffer.reduce((sum, chunk) => sum + chunk.length, 0);
        const merged = new Int16Array(totalLength);
        let offset = 0;
        for (const chunk of this.pcmBuffer) {
            merged.set(chunk, offset);
            offset += chunk.length;
        }
        this.pcmBuffer = [];
        return merged;
    }
}
