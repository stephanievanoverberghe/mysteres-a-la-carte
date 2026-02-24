'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';
import SectionTitle from '@/shared/ui/SectionTitle';
import SectionDivider from '@/shared/ui/SectionDivider';
import { MENUS } from '@/content/menus';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardV = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

export default function Menus() {
    return (
        <section id="experiences" aria-labelledby="menus-title" className="relative md:py-24 py-14">
            <div className="container">
                {/* Marges horizontales sur tablette, reset sur desktop */}
                <div className="md:px-10 lg:px-0">
                    <div className="max-w-2xl">
                        <ScrollReveal>
                            <SectionTitle id="menus-title">Nos expériences</SectionTitle>
                        </ScrollReveal>
                        <p className="mt-3 text-muted-foreground">Quatre parcours à la carte. Choisissez votre mystère.</p>
                    </div>

                    <SectionDivider className="mt-6" />

                    <motion.div
                        variants={containerV}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
                        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {MENUS.map((m) => (
                            <motion.article
                                key={m.id}
                                variants={cardV}
                                whileHover={{ y: -6 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                                className="group relative rounded-2xl border border-muted shadow-soft overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={m.image}
                                        alt={`${m.title} — visuel`}
                                        fill
                                        className="object-cover will-change-transform transition-transform duration-700 group-hover:scale-[1.04] group-hover:saturate-[1.15]"
                                        sizes="(min-width:1280px) 560px, (min-width:1024px) 50vw, 100vw"
                                        priority={false}
                                        draggable={false}
                                    />

                                    {/* Gradient pour le contraste */}
                                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                                    {/* Badge prix */}
                                    <div className="absolute left-4 top-4 rounded-xl border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur text-white text-xs">
                                        {m.price}€
                                    </div>

                                    {/* Tags */}
                                    {m.tags.length > 0 && (
                                        <div className="absolute right-4 top-4 hidden lg:flex flex-wrap gap-2">
                                            {m.tags.map((t) => (
                                                <span key={t} className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[11px] text-white/90 backdrop-blur">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Bandeau “glass” */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 hidden lg:block
                             p-5 bg-background/50 backdrop-blur border-t border-white/10
                             translate-y-6 opacity-0 transition-all duration-500
                             group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">{m.title}</h3>
                                                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                                            </div>
                                            <div className="text-primary font-bold">{m.price}€</div>
                                        </div>

                                        <div className="mt-3 flex items-center gap-3">
                                            <a href="#concept" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-primary">
                                                Voir le concept
                                            </a>
                                            <a href="#reserver" className="btn">
                                                <UtensilsCrossed className="h-4 w-4" />
                                                Choisir
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Contenu mobile/tablette */}
                                <div className="p-6 lg:hidden">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">{m.title}</h3>
                                            <p className="mt-2 text-muted-foreground">{m.desc}</p>
                                        </div>
                                        <div className="text-right text-primary font-bold">{m.price}€</div>
                                    </div>

                                    {m.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {m.tags.map((t) => (
                                                <span key={t} className="rounded-full border border-muted px-3 py-1 text-xs text-muted-foreground">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-6 flex flex-col items-stretch gap-3">
                                        <a href="#reserver" className="btn w-full justify-center">
                                            <UtensilsCrossed className="h-4 w-4" />
                                            Choisir ce menu
                                        </a>
                                        <a
                                            href="#concept"
                                            className="inline-flex w-full items-center justify-center text-sm underline underline-offset-4 text-muted-foreground hover:text-primary"
                                        >
                                            Voir le concept
                                        </a>
                                    </div>
                                </div>

                                {/* liseré or discret */}
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute left-6 right-6 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                                />
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
