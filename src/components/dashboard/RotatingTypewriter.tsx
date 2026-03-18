"use client";

import { useEffect, useState } from "react";

type RotatingWordTone = "blue" | "emerald" | "coral" | "indigo" | "amber";

interface RotatingWord {
    text: string;
    tone: RotatingWordTone;
}

interface RotatingTypewriterProps {
    words: RotatingWord[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseMs?: number;
    className?: string;
}

export default function RotatingTypewriter({
    words,
    typingSpeed = 140,
    deletingSpeed = 70,
    pauseMs = 1100,
    className = "",
}: RotatingTypewriterProps) {
    const safeWords = words.length > 0 ? words : [{ text: "健康", tone: "blue" as const }];
    const [wordIndex, setWordIndex] = useState(0);
    const [visibleText, setVisibleText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const currentWord = safeWords[wordIndex];

    useEffect(() => {
        const fullText = currentWord.text;
        const hasTypedFullWord = visibleText === fullText;
        const hasClearedWord = visibleText.length === 0;

        let timer: ReturnType<typeof setTimeout>;

        if (!isDeleting && hasTypedFullWord) {
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseMs);

            return () => clearTimeout(timer);
        }

        if (isDeleting && hasClearedWord) {
            timer = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((currentIndex) => (currentIndex + 1) % safeWords.length);
            }, deletingSpeed * 2);

            return () => clearTimeout(timer);
        }

        timer = setTimeout(() => {
            setVisibleText((currentText) =>
                isDeleting
                    ? fullText.slice(0, Math.max(0, currentText.length - 1))
                    : fullText.slice(0, currentText.length + 1),
            );
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentWord.text, deletingSpeed, isDeleting, pauseMs, safeWords.length, typingSpeed, visibleText]);

    return (
        <span className={`rotating-typewriter rotating-typewriter--${currentWord.tone} ${className}`.trim()}>
            <span className="rotating-typewriter__word">{visibleText || "\u00A0"}</span>
            <span className="typewriter-caret rotating-typewriter__caret" aria-hidden="true" />
        </span>
    );
}
