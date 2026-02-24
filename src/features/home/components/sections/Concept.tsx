'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, UtensilsCrossed, Users, Search, Timer } from 'lucide-react';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';
import SectionTitle from '@/shared/ui/SectionTitle';
import SectionDivider from '@/shared/ui/SectionDivider';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const blockV = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };

const ITEMS = [
    { icon: Lightbulb, title: 'Jouez', desc: 'Des indices cachés dans les menus, les plats et l’ambiance.' },
    { icon: UtensilsCrossed, title: 'Dégustez', desc: 'Chaque bouchée révèle une piste. Comparez, savourez.' },
    { icon: Users, title: 'Collaborez', desc: 'Le service vous aiguille juste ce qu’il faut, en équipe.' },
] as const;

export default function Concept() {
    const prefersReduced = useReducedMotion();

    // Tilt/parallax image
    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);

    const spx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.2 });
    const spy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.2 });

    const rotY: MotionValue<number> = useTransform(spx, (v) => v * 6);
    const rotX: MotionValue<number> = useTransform(spy, (v) => v * -4);
    const transX: MotionValue<number> = useTransform(spx, (v) => v * 6);
    const transY: MotionValue<number> = useTransform(spy, (v) => v * 4);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mx.set(x * 2 - 1);
        my.set(y * 2 - 1);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <section id="concept" aria-labelledby="concept-title" className="relative md:py-24 py-14">
            <div className="container">
                <div className="md:mx-8 lg:mx-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
                        <div className="max-w-2xl order-2 lg:order-1">
                            <ScrollReveal>
                                <SectionTitle id="concept-title">Le concept</SectionTitle>
                            </ScrollReveal>
                            <p className="mt-3 text-muted-foreground">Une expérience immersive qui mêle jeu d’enquête et gastronomie. 60 à 90 minutes, difficulté modulable.</p>

                            {/* Mini timeline 1-2-3 */}
                            <motion.ol variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px -20% 0px' }} className="mt-8 grid gap-4">
                                {ITEMS.map(({ icon: Icon, title, desc }, i) => (
                                    <motion.li
                                        key={title}
                                        variants={blockV}
                                        className="group relative grid grid-cols-[auto,1fr] gap-4 items-start rounded-2xl border border-muted bg-background/60 p-4 shadow-soft"
                                    >
                                        <div className="relative h-10 w-10 rounded-xl border border-muted bg-background/60 grid place-items-center text-primary">
                                            <Icon className="h-5 w-5" />
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute -z-10 inset-0 rounded-xl bg-[radial-gradient(50%_50%_at_50%_0%,var(--color-primary)/20_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground/80">0{i + 1}</span>
                                                <h3 className="text-base font-semibold">{title}</h3>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ol>

                            {/* Infos rapides */}
                            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Groupes 2–6</span>
                                <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Adapté débutants</span>
                                <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Menus au choix</span>
                            </div>
                        </div>

                        {/* Visuel avec tilt/parallax + badges flottants */}
                        <motion.div variants={blockV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px -20% 0px' }} className="order-1 lg:order-2">
                            <motion.div
                                ref={cardRef}
                                onMouseMove={onMove}
                                onMouseLeave={onLeave}
                                className="relative aspect-[16/10] lg:aspect-[5/4] rounded-2xl border border-muted shadow-soft overflow-hidden"
                                style={{ transformStyle: 'preserve-3d', perspective: 1000 } as React.CSSProperties}
                            >
                                {/* Visuel */}
                                <motion.div
                                    style={{
                                        x: prefersReduced ? 0 : transX,
                                        y: prefersReduced ? 0 : transY,
                                        rotateX: prefersReduced ? 0 : rotX,
                                        rotateY: prefersReduced ? 0 : rotY,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    className="absolute inset-0 will-change-transform"
                                >
                                    <Image
                                        src="/concept.webp"
                                        alt="Ambiance d’enquête culinaire : indices, service complice, table raffinée"
                                        fill
                                        className="object-cover"
                                        sizes="(min-width:1024px) 560px, (min-width:768px) 50vw, 100vw"
                                    />
                                    <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20" />
                                </motion.div>

                                {/* Badge “Indice” */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease }}
                                    className="absolute left-4 top-4 rounded-xl border border-white/20 bg-black/40 px-3 py-2 backdrop-blur text-white/90 text-xs flex items-center gap-2"
                                    style={{ transform: 'translateZ(40px)' }}
                                >
                                    <Search className="h-4 w-4" />
                                    Indice caché
                                </motion.div>

                                {/* Badge “Durée” */}
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, ease, delay: 0.08 }}
                                    className="absolute right-4 bottom-4 rounded-xl border border-white/20 bg-black/40 px-3 py-2 backdrop-blur text-white/90 text-xs flex items-center gap-2"
                                    style={{ transform: 'translateZ(50px)' }}
                                >
                                    <Timer className="h-4 w-4" />
                                    60–90 min
                                </motion.div>

                                {/* Glow doré discret */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl opacity-40"
                                    style={{ background: 'radial-gradient(closest-side, rgba(212,175,55,0.25), transparent 70%)' }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ligne d’accent */}
                    <SectionDivider className="mt-10" />
                </div>
            </div>

            {/* Glow de section */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(800px_360px_at_70%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}
