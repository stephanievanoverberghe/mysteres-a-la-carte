'use client';
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const ease = [0.22, 1, 0.36, 1] as const;

type QA = { id: string; q: string; a: ReactNode };

const FAQS: QA[] = [
    {
        id: 'duree',
        q: 'Combien de temps dure l’expérience ?',
        a: 'Entre 60 et 90 minutes selon votre rythme et le menu choisi.',
    },
    {
        id: 'groupe',
        q: 'Combien de joueurs par table ?',
        a: 'De 2 à 6 joueurs par table. Au-delà, on organise plusieurs tables (idéal team-building).',
    },
    {
        id: 'age',
        q: 'À partir de quel âge ?',
        a: 'Dès 8 ans pour le menu “Aventure gourmande (enfants)”. Pour les autres menus, nous recommandons 12+.',
    },
    {
        id: 'allergies',
        q: 'Gérez-vous les allergies et régimes ?',
        a: (
            <>
                Oui. Sélectionnez le menu adapté (ex. <b>Botanique</b> végétarien) et précisez vos restrictions dans le champ “Allergies”. Nous vous confirmerons les options
                possibles.
            </>
        ),
    },
    {
        id: 'langues',
        q: 'Langues disponibles ?',
        a: 'Français par défaut. Version anglaise possible sur demande lors de la réservation.',
    },
    {
        id: 'privatisation',
        q: 'Privatisation / entreprises ?',
        a: 'Oui, formats sur-mesure (défis, timing, branding). Contactez-nous pour un devis.',
    },
    {
        id: 'accessibilite',
        q: 'Accessibilité',
        a: 'Nous faisons le maximum pour accueillir tous les publics. Dites-nous vos besoins spécifiques, on s’adapte.',
    },
    {
        id: 'annulation',
        q: 'Annulation / report',
        a: 'En cas d’imprévu, écrivez-nous au plus tôt : nous privilégions le report à une autre date.',
    },
];

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

    return (
        <section id="faq" aria-labelledby="faq-title" className="relative">
            <div className="container">
                <div className="flex items-start gap-3">
                    <HelpCircle className="mt-1 h-6 w-6 text-primary" />
                    <div className="max-w-2xl">
                        <ScrollReveal>
                            <h2 id="faq-title" className="text-3xl md:text-4xl font-semibold">
                                FAQ
                            </h2>
                        </ScrollReveal>
                        <p className="mt-3 text-muted-foreground">Les réponses aux questions les plus fréquentes.</p>
                    </div>
                </div>

                {/* ligne d’accent */}
                <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {FAQS.map((item) => (
                        <FAQItem key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))} />
                    ))}
                </div>

                {/* CTA contact */}
                <div className="mt-10 flex items-center gap-3 text-sm">
                    <a href="#contact" className="btn">
                        <Mail className="h-4 w-4" />
                        Nous contacter
                    </a>
                    <span className="text-muted-foreground">Toujours une question&nbsp;? On vous répond rapidement.</span>
                </div>
            </div>

            {/* glow discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(800px_360px_at_20%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}

function FAQItem({ item, open, onToggle }: { item: QA; open: boolean; onToggle: () => void }) {
    const regionId = `faq-panel-${item.id}`;
    const btnId = `faq-btn-${item.id}`;

    return (
        <article className="relative rounded-2xl border border-muted bg-background/60 p-4 md:p-5 shadow-soft">
            {/* liseré or discret */}
            <span aria-hidden className="pointer-events-none absolute left-4 right-4 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]" />

            <button id={btnId} aria-controls={regionId} aria-expanded={open} onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
                <span className="text-base md:text-lg font-medium">{item.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? 'rotate-180 text-primary' : 'rotate-0 text-muted-foreground'}`} />
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={regionId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease } }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 text-sm md:text-base text-muted-foreground">{item.a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
}
