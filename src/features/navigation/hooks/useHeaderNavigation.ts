'use client';

import { useEffect, useState } from 'react';

export function useHeaderNavigation() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!('IntersectionObserver' in window)) {
            return;
        }

        const ids = ['hero', 'concept', 'experiences', 'steps', 'dataviz', 'reserver', 'faq', 'contact'];
        const targets = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`));
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        );
        targets.forEach((el) => io.observe(el));
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
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [open]);

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const handler = () => setOpen(false);
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    return { active, hidden, open, scrolled, setOpen };
}
