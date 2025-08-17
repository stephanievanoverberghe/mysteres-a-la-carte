'use client';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Train, Car, Navigation } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;
const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const blockV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// --------- Adresse ----------
const ADDRESS_LINE = 'Bastille, 75011 Paris';
const EMAIL = 'orangestreet@live.fr';
const PHONE = '+33 1 23 45 67 89';
const MAPS_QUERY = encodeURIComponent('Mystères à la carte, Bastille, Paris');
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
// ---------------------------------------

const HOURS: { label: string; value: string }[] = [
    { label: 'Lun — Jeu', value: '18:00 – 22:30' },
    { label: 'Ven', value: '18:00 – 23:30' },
    { label: 'Sam', value: '12:00 – 23:30' },
    { label: 'Dim', value: '12:00 – 22:00' },
];

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-title" className="relative">
            <div className="container">
                <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px -20% 0px' }}>
                    {/* Titre */}
                    <motion.div variants={blockV} className="flex items-start gap-3">
                        <MapPin className="mt-1 h-6 w-6 text-primary" />
                        <div className="max-w-2xl">
                            <h2 id="contact-title" className="text-3xl md:text-4xl font-semibold">
                                Contact & Accès
                            </h2>
                            <p className="mt-3 text-muted-foreground">Retrouvez-nous à Bastille. Écrivez-nous ou réservez votre table.</p>
                        </div>
                    </motion.div>

                    {/* ligne d’accent */}
                    <motion.div variants={blockV} className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                    {/* Grid info + carte */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Colonne infos */}
                        <motion.div variants={blockV} className="space-y-6">
                            <section aria-labelledby="address-title" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                                <h3 id="address-title" className="text-lg font-semibold flex items-center gap-2">
                                    <Navigation className="h-5 w-5 text-primary" /> Adresse
                                </h3>
                                <address className="not-italic mt-2 text-muted-foreground">
                                    Mystères à la carte
                                    <br />
                                    {ADDRESS_LINE}
                                </address>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn">
                                        Itinéraire
                                    </a>
                                    <a href="#reserver" className="btn" aria-label="Aller à la section Réserver">
                                        Réserver
                                    </a>
                                </div>
                            </section>

                            <section aria-labelledby="contact-infos-title" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                                <h3 id="contact-infos-title" className="text-lg font-semibold">
                                    Nous joindre
                                </h3>
                                <ul className="mt-3 space-y-2 text-muted-foreground">
                                    <li className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-primary" />
                                        <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${EMAIL}`}>
                                            {EMAIL}
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <a className="underline underline-offset-4 hover:text-primary" href={`tel:${PHONE.replace(/\s+/g, '')}`}>
                                            {PHONE}
                                        </a>
                                    </li>
                                </ul>
                            </section>

                            <section aria-labelledby="hours-title" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                                <h3 id="hours-title" className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" /> Horaires
                                </h3>
                                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    {HOURS.map((h) => (
                                        <div key={h.label} className="flex justify-between">
                                            <dt className="text-muted-foreground">{h.label}</dt>
                                            <dd className="font-medium">{h.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>

                            <section aria-labelledby="access-title" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                                <h3 id="access-title" className="text-lg font-semibold">
                                    Accès
                                </h3>
                                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Train className="h-4 w-4 text-primary" />
                                        Métro Bastille (1, 5, 8) · Ledru-Rollin (8)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Car className="h-4 w-4 text-primary" />
                                        Parkings publics à proximité (Opéra Bastille)
                                    </li>
                                </ul>
                            </section>
                        </motion.div>

                        {/* Colonne carte */}
                        <motion.div variants={blockV} className="rounded-2xl border border-muted bg-background/60 overflow-hidden shadow-soft">
                            <div className="aspect-[4/3] w-full">
                                <iframe title="Carte - Mystères à la carte" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" />
                            </div>
                            <div className="p-4 text-xs text-muted-foreground">Astuce : arrivez 10 minutes en avance pour le brief de table.</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Glow discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(800px_360px_at_80%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}
