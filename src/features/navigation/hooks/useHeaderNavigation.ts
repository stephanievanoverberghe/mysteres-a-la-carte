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
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        return listenWindowEvent('scroll', onScroll, { passive: true });
    }, []);

    useEffect(() => {
        const ids = SECTION_IDS;

        if (!('IntersectionObserver' in window)) {
            const syncActiveFromScroll = () => {
                let current = 'hero';
                ids.forEach((id) => {
                    const element = document.getElementById(id);
                    if (!element) return;
                    const { top } = element.getBoundingClientRect();
                    if (top <= window.innerHeight * 0.5) current = id;
                });

                setActive(`#${current}`);
            };

            syncActiveFromScroll();
            return listenWindowEvent('scroll', syncActiveFromScroll, { passive: true });
        }

        const targets = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        );

        targets.forEach((element) => io.observe(element));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            if (window.innerWidth >= 1024 || open) return;
            const y = window.scrollY;
            const goingDown = y > lastY + 4;
            const goingUp = y < lastY - 4;
            if (y > 80 && goingDown) setHidden(true);
            if (goingUp) setHidden(false);
            lastY = y;
        };

        return listenWindowEvent('scroll', onScroll, { passive: true });
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
