'use client';
import { useEffect } from 'react';

/**
 * Orchestrateur d'effets de scroll directionnels (molette).
 * - Définit sur <html> :
 *    --fx-speed : 0..1 (intensité instantanée)
 *    --fx-dir   : -1 (up), 0 (immobile), 1 (down)
 *    data-scroll-dir = 'up' | 'down' | 'none'
 * - Activé uniquement dès 1024px (lg).
 */
export default function ScrollOrchestrator() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mq = window.matchMedia('(min-width: 1024px)');
        if (!mq.matches) return;

        const root = document.documentElement;
        let target = 0;
        let current = 0;
        let dirSign = 0;
        let dir: 'up' | 'down' | 'none' = 'none';
        let raf = 0;

        const onWheel = (e: WheelEvent) => {
            const dy = e.deltaY;
            if (dy === 0) return;
            dirSign = dy > 0 ? 1 : -1;
            dir = dy > 0 ? 'down' : 'up';
            // Normalisation : trackpad/molette
            target = Math.min(1, Math.abs(dy) / 120);
        };

        const tick = () => {
            // lissage + décroissance
            current += (target - current) * 0.15;
            target *= 0.92;

            if (current < 0.001) {
                current = 0;
                if (target < 0.01) {
                    dir = 'none';
                    dirSign = 0;
                }
            }

            root.style.setProperty('--fx-speed', current.toFixed(4));
            root.style.setProperty('--fx-dir', String(dirSign));
            root.dataset.scrollDir = dir;

            raf = requestAnimationFrame(tick);
        };

        window.addEventListener('wheel', onWheel, { passive: true });
        raf = requestAnimationFrame(tick);

        const onChange = (ev: MediaQueryListEvent) => {
            if (!ev.matches) {
                // on coupe tout si on repasse < lg
                root.style.setProperty('--fx-speed', '0');
                root.style.setProperty('--fx-dir', '0');
                root.dataset.scrollDir = 'none';
                cancelAnimationFrame(raf);
                window.removeEventListener('wheel', onWheel);
            }
        };
        mq.addEventListener('change', onChange);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('wheel', onWheel);
            mq.removeEventListener('change', onChange);
            root.style.removeProperty('--fx-speed');
            root.style.removeProperty('--fx-dir');
            delete root.dataset.scrollDir;
        };
    }, []);

    return null;
}
