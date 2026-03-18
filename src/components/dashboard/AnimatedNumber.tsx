"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
}

export default function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) {
            return;
        }

        const controls = animate(0, value, {
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(latest) {
                setDisplayValue(latest);
            },
        });

        return () => controls.stop();
    }, [isInView, value]);

    const formatter = useMemo(
        () =>
            new Intl.NumberFormat("zh-CN", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            }),
        [decimals],
    );

    return <span ref={ref}>{formatter.format(displayValue)}</span>;
}
