'use client';
import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('@/shared/ui/fx//BackgroundFX'), { ssr: false });
const CursorGlow = dynamic(() => import('@/shared/ui/fx/CursorGlow'), { ssr: false });
const TopLoader = dynamic(() => import('@/shared/ui/fx/TopLoader'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/shared/ui/fx/ScrollProgress'), { ssr: false });
const Splash = dynamic(() => import('@/shared/ui/fx/Splash'), { ssr: false });

export default function FXMounts() {
    return (
        <>
            <TopLoader />
            <BackgroundFX />
            <CursorGlow />
            <ScrollProgress />
            <Splash />
        </>
    );
}
