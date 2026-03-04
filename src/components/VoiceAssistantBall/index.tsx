'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SubtitleBubble from './SubtitleBubble';
import { WebSpeechProvider } from './webSpeechProvider';
import './voice-assistant.css';

type BallState = 'idle' | 'listening';
type MessageType = 'transcript' | 'info' | 'error';

const provider = new WebSpeechProvider();

export default function VoiceAssistantBall() {
    const [ballState, setBallState] = useState<BallState>('idle');
    const [subtitleText, setSubtitleText] = useState('');
    const [isFinal, setIsFinal] = useState(false);
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [messageType, setMessageType] = useState<MessageType>('transcript');
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showMessage = useCallback((text: string, type: MessageType, final: boolean) => {
        // 清除已有的淡出计时器
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
        if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = setTimeout(() => {
            setBubbleVisible(false);
        }, delay);
    }, []);

    const handleToggle = () => {
        if (ballState === 'idle') {
            startListening();
        } else {
            stopListening();
        }
    };

    const startListening = () => {
        if (!provider.isSupported()) {
            showMessage('请使用 Chrome 或 Edge 浏览器以启用语音功能', 'info', true);
            scheduleFade(5000);
            return;
        }

        setBallState('listening');
        showMessage('', 'transcript', false);

        provider.start(
            (result) => {
                showMessage(result.text, 'transcript', result.isFinal);
            },
            (error) => {
                if (error === 'permission_denied') {
                    showMessage('请在浏览器设置中允许麦克风权限后重试', 'error', true);
                } else if (error === 'browser_not_supported') {
                    showMessage('请使用 Chrome 或 Edge 浏览器以启用语音功能', 'info', true);
                } else {
                    showMessage('语音识别出现问题，请重试', 'error', true);
                }
                setBallState('idle');
                scheduleFade(5000);
            }
        );
    };

    const stopListening = () => {
        provider.stop();
        setBallState('idle');
        // 停止后 3 秒淡出字幕
        scheduleFade(3000);
    };

    // 组件卸载时清理
    useEffect(() => {
        return () => {
            provider.stop();
            if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
        };
    }, []);

    const MicIcon = () => (
        <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
    );

    const StopIcon = () => (
        <svg className="voice-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h12v12H6z" />
        </svg>
    );

    return (
        <div className="voice-assistant-wrapper">
            {/* 字幕气泡（在悬浮球左侧） */}
            <SubtitleBubble
                text={subtitleText}
                isFinal={isFinal}
                isListening={ballState === 'listening'}
                visible={bubbleVisible}
                messageType={messageType}
            />

            {/* 悬浮球按钮 */}
            <button
                className={`voice-assistant-ball ${ballState}`}
                onClick={handleToggle}
                aria-label={ballState === 'idle' ? '开始语音输入' : '停止语音输入'}
                title={ballState === 'idle' ? '点击开始语音输入' : '点击停止语音输入'}
            >
                {/* listening 状态的脉冲环 */}
                {ballState === 'listening' && (
                    <>
                        <span className="pulse-ring" />
                        <span className="pulse-ring" />
                    </>
                )}
                {ballState === 'listening' ? <StopIcon /> : <MicIcon />}
            </button>
        </div>
    );
}
