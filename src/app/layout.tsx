import type { Metadata } from 'next';
import './globals.css';

import { ToastProvider } from '@/shared/ui/fx/ToastProvider';
import SkipLink from '@/shared/ui/navigation/SkipLink';
import ScrollOrchestrator from '@/shared/ui/fx/scroll/ScrollOrchestrator';
import FXMounts from '@/shared/ui/fx/FXMounts';
import { getSiteUrlObject } from '@/shared/lib/seo/site-url';

export const metadata: Metadata = {
    metadataBase: getSiteUrlObject(),
    title: { default: 'Mystères à la carte', template: '%s — Mystères à la carte' },
    description: 'Escape game culinaire à Bastille. Démo one-page pour portfolio.',
    alternates: { canonical: '/' },
    keywords: ['escape game culinaire', 'Bastille', 'expérience immersive', 'restaurant immersif', 'mystères à la carte'],
    authors: [{ name: 'Alchimiste Créations / Stéphanie Vanoverberghe' }],
    category: 'food and entertainment',
    openGraph: {
        type: 'website',
        url: '/',
        siteName: 'Mystères à la carte',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
                alt: 'Mystères à la carte — Résolvez l’énigme. Dégustez la solution.',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['/og.png'],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="overflow-x-hidden">
                <ScrollOrchestrator />
                <SkipLink />
                <ToastProvider>
                    <FXMounts />
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
