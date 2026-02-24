'use client';

import { useEffect, useState } from 'react';
import { listenWindowEvent } from '@/shared/lib/browser/events';

const SECTION_IDS = ['hero', 'concept', 'experiences', 'steps', 'dataviz', 'reserver', 'faq', 'contact'];

export function useHeaderNavigation() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const ids = SECTION_IDS;
        const hasIntersectionObserver = 'IntersectionObserver' in window;
        const fallbackTargets = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        let rafId = 0;
        let lastY = window.scrollY;

        const syncFromScroll = () => {
            const y = window.scrollY;

            setScrolled(y > 8);

            if (window.innerWidth < 1024 && !open) {
                const goingDown = y > lastY + 4;
                const goingUp = y < lastY - 4;
                if (y > 80 && goingDown) setHidden(true);
                if (goingUp) setHidden(false);
            }

            if (!hasIntersectionObserver) {
                let current = 'hero';
                fallbackTargets.forEach((element) => {
                    const { top } = element.getBoundingClientRect();
                    if (top <= window.innerHeight * 0.5) current = element.id;
                });
                setActive(`#${current}`);
            }

            lastY = y;
            rafId = 0;
        };

        const onScroll = () => {
            if (rafId !== 0) return;
            rafId = requestAnimationFrame(syncFromScroll);
        };

        syncFromScroll();
        const detachScroll = listenWindowEvent('scroll', onScroll, { passive: true });

        if (!hasIntersectionObserver) {
            return () => {
                detachScroll();
                if (rafId !== 0) cancelAnimationFrame(rafId);
            };
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        );

        fallbackTargets.forEach((element) => io.observe(element));
        return () => {
            io.disconnect();
            detachScroll();
            if (rafId !== 0) cancelAnimationFrame(rafId);
        };
    }, [open]);

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    useEffect(() => listenWindowEvent('hashchange', () => setOpen(false)), []);

    return { active, hidden, open, scrolled, setOpen };
}
