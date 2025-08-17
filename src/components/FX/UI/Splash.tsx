'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Splash() {
    const [show, setShow] = useState(false);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        // n'affiche qu'une fois par onglet
        const seen = sessionStorage.getItem('mac_splash_seen');
        if (!seen) {
            setShow(true);
            // auto close après 1.8s (ou instant si reduced motion)
            const t = setTimeout(() => close(), prefersReduced ? 50 : 1800);
            return () => clearTimeout(t);
        }
    }, [prefersReduced]);

    function close() {
        sessionStorage.setItem('mac_splash_seen', '1');
        setShow(false);
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[120] grid place-items-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.35, ease } }}
                >
                    {/* halo */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_30%,var(--color-primary)_0%,transparent_60%)] opacity-15"
                    />

                    {/* logo typographique */}
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease } }}
                        className="relative select-none text-center"
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl font-semibold tracking-tight"
                            initial="hidden"
                            animate="show"
                            variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.055 } },
                            }}
                        >
                            {'Mystères à la carte'.split('').map((c, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    variants={{
                                        hidden: { y: 18, opacity: 0 },
                                        show: { y: 0, opacity: 1, transition: { duration: 0.5, ease } },
                                    }}
                                >
                                    {c === ' ' ? '\u00A0' : c}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* underline qui se dessine */}
                        <motion.span
                            aria-hidden
                            className="absolute -bottom-2 left-1/2 h-[2px] w-40 -translate-x-1/2 bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1, transition: { delay: 0.4, duration: 0.6, ease } }}
                        />

                        {/* skip */}
                        <button onClick={close} className="mt-8 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary">
                            Passer
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
