'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseSplashScreenParams = {
    storageKey: string;
    reducedMotionDelayMs?: number;
    defaultDelayMs?: number;
    prefersReduced?: boolean;
};

export function useSplashScreen({ storageKey, reducedMotionDelayMs = 80, defaultDelayMs = 1600, prefersReduced = false }: UseSplashScreenParams) {
    const [show, setShow] = useState(false);
    const startedRef = useRef(false);
    const timerRef = useRef<number | null>(null);

    const clearCloseTimer = useCallback(() => {
        if (!timerRef.current) return;
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
    }, []);

    const close = useCallback(() => {
        sessionStorage.setItem(storageKey, '1');
        setShow(false);
        clearCloseTimer();
    }, [clearCloseTimer, storageKey]);

    const startAutoClose = useCallback(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        timerRef.current = window.setTimeout(close, prefersReduced ? reducedMotionDelayMs : defaultDelayMs);
    }, [close, defaultDelayMs, prefersReduced, reducedMotionDelayMs]);

    useEffect(() => {
        const seen = sessionStorage.getItem(storageKey);
        if (!seen) {
            setShow(true);
        }

        return clearCloseTimer;
    }, [clearCloseTimer, storageKey]);

    return { close, show, startAutoClose };
}
