'use client';

import React from 'react';

interface SubtitleBubbleProps {
    text: string;
    isFinal: boolean;
    isListening: boolean;
    visible: boolean;
    messageType?: 'transcript' | 'info' | 'error';
}

export default function SubtitleBubble({
    text,
    isFinal,
    isListening,
    visible,
    messageType = 'transcript',
}: SubtitleBubbleProps) {
    const getTextClass = () => {
        if (messageType === 'error') return 'subtitle-text error';
        if (messageType === 'info') return 'subtitle-text info';
        return isFinal ? 'subtitle-text final' : 'subtitle-text interim';
    };

    return (
        <div className={`subtitle-bubble ${visible ? 'visible' : 'hidden'}`}>
            {isListening && messageType === 'transcript' && (
                <div className="subtitle-status">
                    <span className="listening-dot" />
                    <span className="status-label">正在聆听...</span>
                </div>
            )}
            <p className={getTextClass()}>
                {text || (isListening ? '请说话...' : '')}
            </p>
        </div>
    );
}
