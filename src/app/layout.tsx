import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { ToastProvider } from '@/components/FX/UI/ToastProvider';
import SkipLink from '@/components/SkipLink';
import ScrollOrchestrator from '@/components/FX/ScrollFX/ScrollOrchestrator';
import FXMounts from '@/components/FX/UI/FXMounts';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mysteres-a-la-carte.vercel.app/'),
    title: { default: 'Mystères à la carte', template: '%s — Mystères à la carte' },
    description: 'Escape game culinaire à Bastille. Démo one-page pour portfolio.',
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
                    {/* Les FX arrivent après : moins d’impact LCP/TTI */}
                    <FXMounts />
                    {children}
                </ToastProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
