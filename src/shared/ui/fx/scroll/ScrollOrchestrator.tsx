'use client';
import { listenWindowEvent } from '@/shared/lib/browser/events';
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
    const mq = window.matchMedia('(min-width: 1024px)');
    if (!mq.matches) return;

    const root = document.documentElement;
    let target = 0;
    let current = 0;
    let dirSign = 0;
    let dir: 'up' | 'down' | 'none' = 'none';
    let raf = 0;

    const onWheel = (event: WheelEvent) => {
      const dy = event.deltaY;
      if (dy === 0) return;
      dirSign = dy > 0 ? 1 : -1;
      dir = dy > 0 ? 'down' : 'up';
      target = Math.min(1, Math.abs(dy) / 120);
    };

    const tick = () => {
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

    const stop = () => {
      root.style.setProperty('--fx-speed', '0');
      root.style.setProperty('--fx-dir', '0');
      root.dataset.scrollDir = 'none';
      cancelAnimationFrame(raf);
      detachWheel();
    };

    const detachWheel = listenWindowEvent('wheel', onWheel, { passive: true });
    raf = requestAnimationFrame(tick);

    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) stop();
    };
    mq.addEventListener('change', onChange);

    return () => {
      stop();
      mq.removeEventListener('change', onChange);
      root.style.removeProperty('--fx-speed');
      root.style.removeProperty('--fx-dir');
      delete root.dataset.scrollDir;
    };
  }, []);

  return null;
}
