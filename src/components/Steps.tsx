'use client';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const STEPS = [
    { n: 1, title: 'Brief de table', desc: 'Annonce du scénario et des règles.' },
    { n: 2, title: 'Entrée-énigme', desc: 'Premiers indices gustatifs.' },
    { n: 3, title: 'Plat principal', desc: 'Pistes à recouper avec l’équipe.' },
    { n: 4, title: 'Dessert-résolution', desc: 'Le twist final se savoure !' },
] as const;

export default function Steps() {
    return (
        <section id="steps" aria-labelledby="steps-title" className="relative">
            <div className="container">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="max-w-2xl">
                        <h2 id="steps-title" className="text-3xl md:text-4xl font-semibold">
                            À quoi vous attendre
                        </h2>
                        <p className="mt-3 text-muted-foreground">Une progression en 4 temps pour savourer l’enquête.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-muted bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" /> 60–90 min • difficulté modulable
                    </div>
                </div>

                {/* ligne d’accent */}
                <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                {/* timeline mobile / grid desktop */}
                <motion.div
                    variants={containerV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
                    className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                    {STEPS.map((s, i) => (
                        <motion.article
                            key={s.n}
                            variants={cardV}
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                            className="
                relative rounded-2xl border border-muted bg-background/60 p-6 shadow-soft
                md:before:hidden
                before:absolute before:left-[1.1rem] before:top-0 before:bottom-0 before:w-px before:bg-muted/60
              "
                        >
                            {/* Connecteur timeline (mobile) */}
                            {i === STEPS.length - 1 && (
                                <span aria-hidden className="md:hidden absolute left-[1.1rem] bottom-0 h-6 w-px bg-gradient-to-b from-muted/60 to-transparent" />
                            )}

                            {/* Badge numéro */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary font-semibold">{s.n}</div>
                                <h3 className="text-lg font-semibold">{s.title}</h3>
                            </div>

                            <p className="mt-3 text-muted-foreground">{s.desc}</p>

                            {/* liseré or discret en haut */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-6 right-6 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                            />
                        </motion.article>
                    ))}
                </motion.div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Groupes 2–6</span>
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Adapté aux débutants</span>
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Serveurs complices</span>
                </div>
            </div>
        </section>
    );
}
