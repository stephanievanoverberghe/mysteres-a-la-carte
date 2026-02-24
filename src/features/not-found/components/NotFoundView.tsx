'use client';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/shared/ui/fx/ToastProvider';
import NotFoundHero from '@/features/not-found/components/blocks/NotFoundHero';
import NotFoundSearch from '@/features/not-found/components/blocks/NotFoundSearch';
import NotFoundShortcuts from '@/features/not-found/components/blocks/NotFoundShortcuts';
import NotFoundActions from '@/features/not-found/components/blocks/NotFoundActions';

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
            // no-op
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
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(1200px_500px_at_30%_20%,var(--color-primary)_0%,transparent_60%)]"
                />

                <div className="mx-auto max-w-3xl">
                    <NotFoundHero />
                    <NotFoundSearch q={q} onChange={setQ} />
                    <NotFoundShortcuts results={results} />
                    <NotFoundActions onGoBack={goBack} onCopyUrl={copyUrl} onReportUrl={reportUrl} />
                </div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(900px_360px_at_80%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}
