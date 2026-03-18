"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
}

export default function TypewriterText({
    text,
    speed = 34,
    className = "",
}: TypewriterTextProps) {
    const [visibleText, setVisibleText] = useState("");

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        let index = 0;

        const tick = () => {
            setVisibleText(text.slice(0, index));
            if (index <= text.length) {
                index += 1;
                timer = setTimeout(tick, speed);
            }
        };

        tick();

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [speed, text]);

    return (
        <span className={`typewriter-text ${className}`.trim()}>
            {visibleText}
            <span className="typewriter-caret" aria-hidden="true" />
        </span>
    );
}
