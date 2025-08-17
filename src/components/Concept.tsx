'use client';
import { motion } from 'framer-motion';
import { Lightbulb, UtensilsCrossed, Users } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const ITEMS = [
    {
        icon: Lightbulb,
        title: 'Jouez',
        desc: 'Des indices cachés dans les menus, les plats et l’ambiance. Ouvrez l’œil… et le palais.',
    },
    {
        icon: UtensilsCrossed,
        title: 'Dégustez',
        desc: 'Chaque bouchée révèle une piste gustative. Comparez, déduisez, savourez.',
    },
    {
        icon: Users,
        title: 'Collaborez',
        desc: 'Les serveurs complices vous aiguillent juste ce qu’il faut. L’enquête se résout en équipe.',
    },
] as const;

export default function Concept() {
    return (
        <section id="concept" aria-labelledby="concept-title" className="relative">
            <div className="container">
                <div className="max-w-2xl">
                    <ScrollReveal>
                        <h2 id="concept-title" className="text-3xl md:text-4xl font-semibold">
                            Le concept
                        </h2>
                    </ScrollReveal>
                    <p className="mt-3 text-muted-foreground">Une expérience immersive qui mêle jeu d’enquête et gastronomie. 60 à 90 minutes, difficulté modulable.</p>
                </div>

                {/* ligne d’accent */}
                <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                {/* cartes */}
                <motion.div
                    variants={containerV}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
                    className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {ITEMS.map(({ icon: Icon, title, desc }) => (
                        <motion.article
                            key={title}
                            variants={cardV}
                            whileHover={{ y: -6 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className="relative rounded-2xl border border-muted bg-background/60 p-6 shadow-soft"
                        >
                            {/* liseré or discret en haut */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute left-6 right-6 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                            />
                            <Icon className="mb-4 h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <p className="mt-2 text-muted-foreground">{desc}</p>
                        </motion.article>
                    ))}
                </motion.div>

                {/* infos rapides */}
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Groupes 2–6</span>
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Adapté aux débutants</span>
                    <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">Menus au choix</span>
                </div>
            </div>
        </section>
    );
}
