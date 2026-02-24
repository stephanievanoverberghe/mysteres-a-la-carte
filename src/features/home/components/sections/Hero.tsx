'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import LiveSpots from '@/features/home/components/ui/LiveSpots';
import Magnetic from '@/shared/ui/fx/Magnetic';
import { motion, useMotionValue, useTransform, useReducedMotion, LazyMotion, domAnimation } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

export default function Hero() {
    const prefersReducedMotion = useReducedMotion();

    const rootRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    useEffect(() => {
        // Parallax souris seulement ≥ lg pour préserver les perfs mobile
        const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
        const el = rootRef.current;
        if (!el || prefersReducedMotion || !isDesktop) return;

        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
            my.set(((e.clientY - r.top) / r.height) * 2 - 1);
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
    }, [prefersReducedMotion, mx, my]);

    const bgX = useTransform(mx, (v) => v * 10);
    const bgY = useTransform(my, (v) => v * 6);

    return (
        <section id="hero" ref={rootRef} className="relative isolate overflow-hidden">
            <motion.div aria-hidden className="absolute inset-0 -z-20 will-change-transform" style={{ x: prefersReducedMotion ? 0 : bgX, y: prefersReducedMotion ? 0 : bgY }}>
                <Image src="/hero.webp" alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover scale-[1.03]" draggable={false} />
            </motion.div>

            {/* Scrims + glow + grain */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 100%)' }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-[42rem] w-[42rem] -z-10 rounded-full blur-3xl opacity-50"
                style={{ background: 'radial-gradient(closest-side, rgba(212,175,55,0.28), transparent 70%)' }}
            />
            <div
                aria-hidden
                className="max-md:hidden pointer-events-none absolute inset-0 -z-[5] opacity-[0.08] mix-blend-soft-light bg-[url('/textures/noise.webp')] bg-repeat bg-[length:240px_240px] animate-[noise-pan_14s_linear_infinite]"
            />

            <LazyMotion features={domAnimation}>
                <motion.div
                    variants={containerV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                    className="container pt-28 pb-28 md:pt-36 md:pb-40"
                >
                    {/* marges horizontales*/}
                    <div className="mx-auto max-w-3xl text-center md:text-left md:mx-8 lg:mx-0">
                        <motion.span
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur"
                        >
                            Escape game culinaire • Bastille, Paris
                        </motion.span>

                        <motion.h1 variants={fadeUp} className="mt-5 text-4xl md:text-6xl font-semibold leading-tight">
                            Résolvez l’énigme.{` `}
                            <span className="relative inline-block">
                                <span className="text-primary relative inline-block overflow-hidden">
                                    Dégustez
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-screen will-change-transform animate-[sweep_2.4s_ease-in-out_infinite]"
                                    />
                                </span>
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

                        <motion.p variants={fadeUp} className="mt-6 mx-auto md:mx-0 max-w-2xl text-lg text-white/80">
                            Indices cachés dans les plats, complicité en salle, 60–90&nbsp;min de sensations à partager.
                        </motion.p>

                        {/* CTA */}
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

                        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-white/80">
                            <span className="rounded-xl border border-white/20 bg-black/30 px-3 py-1 backdrop-blur">Durée 60–90 min</span>
                            <span className="rounded-xl border border-white/20 bg-black/30 px-3 py-1 backdrop-blur">2–6 joueurs</span>
                            <span className="rounded-xl border border-white/20 bg-black/30 px-3 py-1 backdrop-blur">4 menus à la carte</span>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-6 flex justify-center md:justify-start">
                            <LiveSpots />
                        </motion.div>
                    </div>
                </motion.div>
            </LazyMotion>

            {/* Hint scroll */}
            <a href="#concept" className="group absolute left-1/2 bottom-6 -translate-x-1/2 hidden md:inline-flex items-center gap-2 text-sm text-white/80 hover:text-primary z-20">
                <ChevronDown className="animate-bounce transition-transform group-hover:translate-y-0.5" />
                Faire défiler
            </a>
        </section>
    );
}
