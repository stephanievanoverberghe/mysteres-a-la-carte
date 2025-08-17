'use client';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LiveSpots from '@/components/LiveSpots';
import Magnetic from './FX/UI/Magnetic';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

export default function Hero() {
    const prefersReducedMotion = useReducedMotion();

    const rootRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    useEffect(() => {
        const el = rootRef.current;
        if (!el || prefersReducedMotion) return;
        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mx.set(x * 2 - 1);
            my.set(y * 2 - 1);
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, [prefersReducedMotion, mx, my]);

    const orb1x = useTransform(mx, (v) => v * 20);
    const orb1y = useTransform(my, (v) => v * 10);
    const orb2x = useTransform(mx, (v) => v * -15);
    const orb2y = useTransform(my, (v) => v * 8);

    return (
        <div ref={rootRef} className="relative isolate overflow-hidden">
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                className="container pt-28 pb-14 md:pt-36 md:pb-40"
            >
                {/* Wrapper pour centrer sur mobile */}
                <div className="mx-auto max-w-3xl text-center md:text-left">
                    {/* Badge intro */}
                    <motion.span
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 rounded-full border border-muted bg-background/60 px-3 py-1 text-xs text-muted-foreground mx-auto md:mx-0"
                    >
                        Escape game culinaire • Bastille, Paris
                    </motion.span>

                    {/* Titre principal */}
                    <motion.h1 variants={fadeUp} className="mt-5 text-4xl md:text-6xl font-semibold leading-tight">
                        Résolvez l’énigme.{' '}
                        <span className="relative inline-block">
                            <span className="text-primary">Dégustez</span>
                            <motion.span
                                aria-hidden
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease }}
                                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-primary"
                            />
                        </span>{' '}
                        la solution.
                    </motion.h1>

                    {/* Accroche */}
                    <motion.p variants={fadeUp} className="mt-6 mx-auto md:mx-0 max-w-2xl text-lg text-muted-foreground">
                        Indices cachés dans les plats, complicité en salle, 60–90&nbsp;min de sensations à partager.
                    </motion.p>

                    {/* CTA — en colonne plein largeur sur mobile, en ligne sur desktop */}
                    <motion.div variants={fadeUp} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-4">
                        <Magnetic>
                            <a href="#reserver" className="btn w-full justify-center sm:w-auto">
                                Réserver maintenant
                            </a>
                        </Magnetic>
                        <a href="#cadeau" className="btn-ghost w-full justify-center sm:w-auto">
                            Offrir une carte cadeau
                        </a>
                        <a href="#concept" className="inline-flex w-full items-center justify-center gap-2 underline underline-offset-4 hover:text-primary sm:w-auto">
                            Voir le concept
                        </a>
                    </motion.div>

                    {/* Chips d’infos — centrées sur mobile */}
                    <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-muted-foreground">
                        <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Durée 60–90 min</span>
                        <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">2–6 joueurs</span>
                        <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">4 menus à la carte</span>
                    </motion.div>

                    {/* Compteur de places — centré sur mobile */}
                    <motion.div variants={fadeUp} className="mt-6 flex justify-center md:justify-start">
                        <LiveSpots />
                    </motion.div>
                </div>
            </motion.div>

            {/* Hint scroll */}
            <a href="#concept" className="absolute left-1/2 top=[85%] -translate-x-1/2 hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <ChevronDown className="animate-bounce" />
                Faire défiler
            </a>

            {/* Orbes / glows */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl will-change-transform"
                style={{
                    x: prefersReducedMotion ? 0 : orb1x,
                    y: prefersReducedMotion ? 0 : orb1y,
                    background: 'radial-gradient(closest-side, rgba(212,175,55,0.35), transparent 70%)',
                }}
                initial={{ opacity: 0.35 }}
                animate={prefersReducedMotion ? {} : { opacity: [0.35, 0.55, 0.35] }}
                transition={prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute top-1/3 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl will-change-transform"
                style={{
                    x: prefersReducedMotion ? 0 : orb2x,
                    y: prefersReducedMotion ? 0 : orb2y,
                    background: 'radial-gradient(closest-side, rgba(15,26,26,0.8), transparent 70%)',
                }}
                initial={{ opacity: 0.22 }}
                animate={prefersReducedMotion ? {} : { opacity: [0.22, 0.4, 0.22] }}
                transition={prefersReducedMotion ? {} : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glow radial général */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(900px_400px_at_30%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </div>
    );
}
