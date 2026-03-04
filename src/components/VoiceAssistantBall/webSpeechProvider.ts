export interface ASRResult {
    text: string;
    isFinal: boolean;
}

export interface ASRProvider {
    start(onResult: (result: ASRResult) => void, onError: (error: string) => void): void;
    stop(): void;
    isSupported(): boolean;
}

export class WebSpeechProvider implements ASRProvider {
    private recognition: SpeechRecognition | null = null;
    private isListening = false;
    private onResultCallback: ((result: ASRResult) => void) | null = null;
    private onErrorCallback: ((error: string) => void) | null = null;

    isSupported(): boolean {
        return typeof window !== 'undefined' &&
            ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    }

    start(onResult: (result: ASRResult) => void, onError: (error: string) => void): void {
        if (!this.isSupported()) {
            onError('browser_not_supported');
            return;
        }

        this.onResultCallback = onResult;
        this.onErrorCallback = onError;

        const SpeechRecognitionAPI =
            (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition })
                .webkitSpeechRecognition || window.SpeechRecognition;

        this.recognition = new SpeechRecognitionAPI();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'zh-CN';

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimText = '';
            let finalText = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalText += transcript;
                } else {
                    interimText += transcript;
                }
            }

            if (finalText) {
                onResult({ text: finalText, isFinal: true });
            } else if (interimText) {
                onResult({ text: interimText, isFinal: false });
            }
        };

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === 'not-allowed') {
                onError('permission_denied');
            } else if (event.error !== 'no-speech') {
                onError(event.error);
            }
        };

        // 语音识别超时（约60s）后自动重启
        this.recognition.onend = () => {
            if (this.isListening) {
                try {
                    this.recognition?.start();
                } catch {
                    // 忽略重启时的重复启动错误
                }
            }
        };

        this.isListening = true;
        try {
            this.recognition.start();
        } catch {
            onError('start_failed');
        }
    }

    stop(): void {
        this.isListening = false;
        try {
            this.recognition?.stop();
        } catch {
            // 忽略停止时的错误
        }
        this.recognition = null;
    }
}
