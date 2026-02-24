'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const BackgroundFX = dynamic(() => import('@/shared/ui/fx/BackgroundFX'), { ssr: false });
const CursorGlow = dynamic(() => import('@/shared/ui/fx/CursorGlow'), { ssr: false });
const TopLoader = dynamic(() => import('@/shared/ui/fx/TopLoader'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/shared/ui/fx/ScrollProgress'), { ssr: false });
const Splash = dynamic(() => import('@/shared/ui/fx/Splash'), { ssr: false });

type NetworkInformationLike = {
  saveData?: boolean;
};

type NavigatorLike = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

function useFXPreferences() {
  const [state, setState] = useState({
    canRenderBackground: true,
    canRenderCursorGlow: false,
    canRenderScrollProgress: false,
    canRenderTopLoader: true,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const pointerFine = window.matchMedia('(pointer: fine)');

    const nav = navigator as NavigatorLike;
    const saveData = nav.connection?.saveData ?? false;
    const lowMemory = (nav.deviceMemory ?? 8) <= 2;

    const sync = () => {
      const hasReducedMotion = reducedMotion.matches;
      const isDesktop = desktop.matches;
      const hasPointerFine = pointerFine.matches;

      setState({
        canRenderBackground: isDesktop && !hasReducedMotion && !saveData && !lowMemory,
        canRenderCursorGlow:
          isDesktop && hasPointerFine && !hasReducedMotion && !saveData && !lowMemory,
        canRenderScrollProgress: !hasReducedMotion && !saveData,
        canRenderTopLoader: !saveData,
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
  const { canRenderBackground, canRenderCursorGlow, canRenderScrollProgress, canRenderTopLoader } =
    useFXPreferences();

  return (
    <>
      {canRenderTopLoader ? <TopLoader /> : null}
      {canRenderBackground ? <BackgroundFX /> : null}
      {canRenderCursorGlow ? <CursorGlow /> : null}
      {canRenderScrollProgress ? <ScrollProgress /> : null}
      <Splash />
    </>
  );
}
