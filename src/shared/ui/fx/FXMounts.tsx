'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const BackgroundFX = dynamic(() => import('@/shared/ui/fx/BackgroundFX'), { ssr: false });
const CursorGlow = dynamic(() => import('@/shared/ui/fx/CursorGlow'), { ssr: false });
const TopLoader = dynamic(() => import('@/shared/ui/fx/TopLoader'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/shared/ui/fx/ScrollProgress'), { ssr: false });
const Splash = dynamic(() => import('@/shared/ui/fx/Splash'), { ssr: false });

function useFXPreferences() {
    const [state, setState] = useState({
        canRenderBackground: true,
        canRenderCursorGlow: false,
        canRenderScrollProgress: false,
    });

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktop = window.matchMedia('(min-width: 1024px)');
        const pointerFine = window.matchMedia('(pointer: fine)');

        const sync = () => {
            const hasReducedMotion = reducedMotion.matches;
            const isDesktop = desktop.matches;
            const hasPointerFine = pointerFine.matches;

            setState({
                canRenderBackground: isDesktop && !hasReducedMotion,
                canRenderCursorGlow: isDesktop && hasPointerFine && !hasReducedMotion,
                canRenderScrollProgress: !hasReducedMotion,
            });
        };

        sync();
        reducedMotion.addEventListener('change', sync);
        desktop.addEventListener('change', sync);
        pointerFine.addEventListener('change', sync);

        return () => {
            reducedMotion.removeEventListener('change', sync);
            desktop.removeEventListener('change', sync);
            pointerFine.removeEventListener('change', sync);
        };
    }, []);

    return state;
}

export default function FXMounts() {
    const { canRenderBackground, canRenderCursorGlow, canRenderScrollProgress } = useFXPreferences();

    return (
        <>
            <TopLoader />
            {canRenderBackground ? <BackgroundFX /> : null}
            {canRenderCursorGlow ? <CursorGlow /> : null}
            {canRenderScrollProgress ? <ScrollProgress /> : null}
            <Splash />
        </>
    );
}
