'use client';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import ScrollReveal from './FX/UI/ScrollReveal';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const MENUS = [
    { id: 'carn-hivor', title: 'Carn Hivor', price: 60, desc: 'Parcours carné, indices fumés & textures franches.', tags: ['carné', 'signature'] },
    { id: 'botanique', title: 'Botanique', price: 50, desc: 'Épopée végétale, herbes fines & révélations florales.', tags: ['végétarien'] },
    { id: 'evasion', title: 'Évasion', price: 50, desc: 'Allergies & restrictions prises en compte.', tags: ['ajusté'] },
    { id: 'aventure-gourmande', title: 'Aventure gourmande (enfants)', price: 30, desc: 'Mystère ludique aux saveurs douces, dès 8 ans.', tags: ['kids'] },
] as const;

export default function Menus() {
    return (
        <section id="experiences" aria-labelledby="menus-title" className="relative">
            <div className="container">
                <div className="max-w-2xl">
                    <ScrollReveal>
                        <h2 id="menus-title" className="text-3xl md:text-4xl font-semibold">
                            Nos expériences
                        </h2>
                    </ScrollReveal>
                    <p className="mt-3 text-muted-foreground">Quatre parcours à la carte. Choisissez votre mystère.</p>
                </div>

                <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

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
                            className="relative rounded-2xl border border-muted bg-background/60 p-6 shadow-soft"
                        >
                            {/* liseré or discret */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-6 right-6 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                            />

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{m.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{m.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-primary font-bold">{m.price}€</div>
                                </div>
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

                            <div className="mt-6 flex items-center justify-between">
                                <a href="#reserver" className="btn">
                                    <UtensilsCrossed className="h-4 w-4" />
                                    Choisir ce menu
                                </a>
                                <a href="#concept" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-primary">
                                    Voir le concept
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
