'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { listenWindowEvent } from '@/shared/lib/browser/events';
import { useEffect } from 'react';
import { useSplashScreen } from '@/shared/lib/browser/useSplashScreen';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Splash() {
  const prefersReduced = useReducedMotion();
  const { show, close, startAutoClose } = useSplashScreen({
    storageKey: 'mac_splash_seen',
    prefersReduced: Boolean(prefersReduced),
  });

  useEffect(() => {
    if (!show) return;

    const { documentElement } = document;
    const prev = documentElement.style.overflowY;
    documentElement.style.overflowY = 'hidden';

    return () => {
      documentElement.style.overflowY = prev;
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;

    return listenWindowEvent('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') close();
    });
  }, [close, show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-120 grid place-items-center bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Écran d’introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease } }}
          onClick={close}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_30%,var(--color-primary)_0%,transparent_60%)] opacity-15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden md:block opacity-[0.06] mix-blend-soft-light bg-[url('/textures/noise.webp')] bg-repeat bg-size-[240px_240px] animate-[noise-pan_16s_linear_infinite]"
          />

          <motion.div
            initial={{ scale: prefersReduced ? 1 : 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease } }}
            className="relative select-none text-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Mystères à la carte"
                width={320}
                height={96}
                priority
                className="h-12 w-auto md:h-16 drop-shadow-[0_0_16px_rgba(212,175,55,0.15)]"
                draggable={false}
                onLoadingComplete={startAutoClose}
              />
            </div>

            {!prefersReduced && (
              <motion.span
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-0.5 w-40 -translate-x-1/2 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transition: { delay: 0.28, duration: 0.6, ease } }}
              />
            )}

            <button
              onClick={close}
              className="mt-8 inline-flex items-center justify-center rounded-xl border border-muted px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary transition"
            >
              Passer
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
