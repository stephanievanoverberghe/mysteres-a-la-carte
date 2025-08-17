'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Search, Copy, Link2, Bug, Home } from 'lucide-react';
import { useToast } from '@/components/FX/UI/ToastProvider';
import Magnetic from '@/components/FX/UI/Magnetic';

const ease = [0.22, 1, 0.36, 1] as const;

type Item = { label: string; href: string; emoji?: string };

const ITEMS: Item[] = [
    { label: 'Concept', href: '/#concept', emoji: '🧩' },
    { label: 'Menus', href: '/#menus', emoji: '🍽️' },
    { label: 'Le saviez-vous ?', href: '/#dataviz', emoji: '📊' },
    { label: 'Réserver', href: '/#reserver', emoji: '🗓️' },
    { label: 'FAQ', href: '/#faq', emoji: '❓' },
    { label: 'Contact & Accès', href: '/#contact', emoji: '📍' },
];

const normalize = (s: string) =>
    s
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

export default function NotFoundView() {
    const { success } = useToast();
    const [q, setQ] = useState('');
    const [currentUrl, setCurrentUrl] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') setCurrentUrl(window.location.href);
    }, []);

    const results = useMemo(() => {
        const n = normalize(q);
        if (!n) return ITEMS;
        return ITEMS.filter((i) => normalize(i.label).includes(n));
    }, [q]);

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl || window.location.href);
            success('Lien copié', 'L’URL de cette page est dans le presse-papiers.');
        } catch {
            // rien, c’est un confort
        }
    };

    const reportUrl = () => {
        const mail = 'contact@mysteresalacarte.fr';
        const subject = encodeURIComponent('Lien cassé — Mystères à la carte');
        const body = encodeURIComponent(`Bonjour,\n\nJ’ai rencontré une page introuvable :\n${currentUrl}\n\nContexte : \n\nMerci !`);
        window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    };

    const goBack = () => {
        if (history.length > 1) history.back();
    };

    return (
        <section className="relative">
            <div className="container py-24 md:py-32">
                {/* halo / glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(1200px_500px_at_30%_20%,var(--color-primary)_0%,transparent_60%)]"
                />

                <div className="mx-auto max-w-3xl">
                    {/* 404 animé */}
                    <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } }} className="text-center">
                        <div className="mx-auto grid grid-cols-3 gap-3 text-7xl md:text-9xl font-semibold tracking-tight">
                            {['4', '0', '4'].map((ch, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1, transition: { delay: 0.08 * i + 0.1, duration: 0.5, ease } }}
                                    className="inline-block bg-clip-text text-transparent"
                                    style={{ backgroundImage: 'linear-gradient(180deg,var(--color-foreground),rgba(212,175,55,0.7))' }}
                                >
                                    {ch}
                                </motion.span>
                            ))}
                        </div>
                        <motion.span
                            aria-hidden
                            className="mx-auto mt-1 block h-[2px] w-48 bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1, transition: { delay: 0.35, duration: 0.6, ease } }}
                        />
                        <motion.h1
                            className="mt-8 text-2xl md:text-3xl font-semibold"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.45, ease } }}
                        >
                            Oups… page introuvable
                        </motion.h1>
                        <motion.p
                            className="mt-3 text-muted-foreground"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.45, ease } }}
                        >
                            Le lien a peut-être changé. Essayez une section ci-dessous ou retournez à l’accueil.
                        </motion.p>
                    </motion.div>

                    {/* Barre de recherche locale */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.45, ease } }} className="mt-10">
                        <label htmlFor="nfq" className="sr-only">
                            Rechercher une section
                        </label>
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                id="nfq"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Rechercher une section (ex. Réserver, FAQ…) "
                                className="w-full rounded-2xl border border-muted bg-background/60 pl-11 pr-4 py-3"
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                    </motion.div>

                    {/* Résultats / raccourcis */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.45, ease } }}
                        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
                        role="listbox"
                        aria-label="Raccourcis vers les sections"
                    >
                        <AnimatePresence initial={false}>
                            {results.map((item) => (
                                <motion.div
                                    key={item.href}
                                    layout
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
                                    exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease } }}
                                >
                                    <Link
                                        href={item.href}
                                        className="group block rounded-2xl border border-muted bg-background/60 px-4 py-3 shadow-soft hover:border-primary/70 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{item.emoji}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="mt-10 flex flex-wrap items-center justify-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.45, ease } }}
                    >
                        <Magnetic>
                            <Link href="/" className="btn inline-flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Accueil
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link href="/#reserver" className="btn inline-flex items-center gap-2">
                                <Compass className="h-4 w-4" />
                                Réserver
                            </Link>
                        </Magnetic>
                        <button onClick={goBack} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                            <ArrowLeft className="h-4 w-4" />
                            Page précédente
                        </button>
                        <button onClick={copyUrl} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                            <Copy className="h-4 w-4" />
                            Copier l’URL
                        </button>
                        <button onClick={reportUrl} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                            <Bug className="h-4 w-4" />
                            Signaler ce lien
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* glow décoratif */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(900px_360px_at_80%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}
