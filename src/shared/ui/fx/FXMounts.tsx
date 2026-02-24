'use client';
import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('@/components/FX/UI/BackgroundFX'), { ssr: false });
const CursorGlow = dynamic(() => import('@/components/FX/UI/CursorGlow'), { ssr: false });
const TopLoader = dynamic(() => import('@/components/FX/UI/TopLoader'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/FX/UI/ScrollProgress'), { ssr: false });
const Splash = dynamic(() => import('@/components/FX/UI/Splash'), { ssr: false });

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
