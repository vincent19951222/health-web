'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubtitleBubble from './SubtitleBubble';
import { VolcASRProvider } from './volcASRProvider';
import './voice-assistant.css';

type BallState = 'idle' | 'listening';
type MessageType = 'transcript' | 'info' | 'error';

const provider = new VolcASRProvider();

function MicIcon() {
    return (
        <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h12v12H6z" />
        </svg>
    );
}

export default function VoiceAssistantBall() {
    const [ballState, setBallState] = useState<BallState>('idle');
    const [subtitleText, setSubtitleText] = useState('');
    const [isFinal, setIsFinal] = useState(false);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [messageType, setMessageType] = useState<MessageType>('transcript');
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showMessage = useCallback((text: string, type: MessageType, final: boolean) => {
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }
        setSubtitleText(text);
        setMessageType(type);
        setIsFinal(final);
        setBubbleVisible(true);
    }, []);

    const scheduleFade = useCallback((delay = 3000) => {
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
        }
        fadeTimerRef.current = setTimeout(() => {
            setBubbleVisible(false);
        }, delay);
    }, []);

    const startListening = async () => {
        if (!provider.isSupported()) {
            showMessage('请使用现代浏览器以启用语音功能', 'info', true);
            scheduleFade(5000);
            return;
        }

        setBallState('listening');
        showMessage('', 'transcript', false);

        await provider.start(
            (result) => {
                showMessage(result.text, 'transcript', result.isFinal);
            },
            (error) => {
                if (error === 'permission_denied') {
                    showMessage('请先在浏览器中允许麦克风权限', 'error', true);
                } else if (error === 'asr_not_configured') {
                    showMessage('语音服务尚未配置，请联系管理员', 'error', true);
                } else if (error === 'connection_failed') {
                    showMessage('语音服务连接失败，请检查网络后重试', 'error', true);
                } else {
                    showMessage('语音识别出现问题，请稍后重试', 'error', true);
                }
                setBallState('idle');
                scheduleFade(5000);
            },
        );
    };

    const stopListening = () => {
        provider.stop();
        setBallState('idle');
        scheduleFade(3000);
    };

    const handleToggle = () => {
        if (ballState === 'idle') {
            void startListening();
            return;
        }

        stopListening();
    };

    useEffect(() => {
        return () => {
            provider.stop();
            if (fadeTimerRef.current) {
                clearTimeout(fadeTimerRef.current);
            }
        };
    }, []);

    const helperTitle = ballState === 'listening' ? '语音采集中' : '语音助手';
    const helperText = ballState === 'listening' ? '请直接说出你的问题' : '点击开始语音录入';

    return (
        <div className="voice-assistant-wrapper">
            <SubtitleBubble
                text={subtitleText}
                isFinal={isFinal}
                isListening={ballState === 'listening'}
                visible={bubbleVisible}
                messageType={messageType}
            />

            <div className={`voice-assistant-dock ${ballState}`}>
                <div className="voice-assistant-dock__copy">
                    <div className="voice-assistant-dock__eyebrow">
                        <span className="voice-assistant-dock__dot" />
                        {helperTitle}
                    </div>
                    <div className="voice-assistant-dock__text">{helperText}</div>
                </div>

                <button
                    className={`voice-assistant-ball ${ballState}`}
                    onClick={handleToggle}
                    aria-label={ballState === 'idle' ? '开始语音输入' : '停止语音输入'}
                    title={ballState === 'idle' ? '点击开始语音输入' : '点击停止语音输入'}
                >
                    {ballState === 'listening' && (
                        <>
                            <span className="pulse-ring" />
                            <span className="pulse-ring" />
                        </>
                    )}
                    {ballState === 'listening' ? <StopIcon /> : <MicIcon />}
                </button>
            </div>
        </div>
    );
}
