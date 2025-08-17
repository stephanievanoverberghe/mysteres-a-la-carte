import './globals.css';

import ScrollProgress from '@/components/FX/UI/ScrollProgress';
import TopLoader from '@/components/FX/UI/TopLoader';
import { ToastProvider } from '@/components/FX/UI/ToastProvider';
import BackgroundFX from '@/components/FX/UI/BackgroundFX';
import CursorGlow from '@/components/FX/UI/CursorGlow';
import Splash from '@/components/FX/UI/Splash';
import SkipLink from '@/components/SkipLink';

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mysteres-a-la-carte.vercel.app/'),
    title: { default: 'Mystères à la carte', template: '%s — Mystères à la carte' },
    description: 'Escape game culinaire à Bastille. Démo one-page pour portfolio.',
    openGraph: {
        type: 'website',
        siteName: 'Mystères à la carte',
    },
    twitter: {
        card: 'summary_large_image',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>
                <SkipLink />
                <TopLoader />
                <BackgroundFX />
                <CursorGlow />
                <ToastProvider>
                    <Splash />
                    <ScrollProgress />
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
