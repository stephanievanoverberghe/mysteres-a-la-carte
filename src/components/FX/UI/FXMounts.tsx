'use client';
import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('./BackgroundFX'), { ssr: false });
const CursorGlow = dynamic(() => import('./CursorGlow'), { ssr: false });
const TopLoader = dynamic(() => import('./TopLoader'), { ssr: false });
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false });
const Splash = dynamic(() => import('./Splash'), { ssr: false });

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
