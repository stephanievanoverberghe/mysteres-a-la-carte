'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
    { href: '#concept', label: 'Concept' },
    { href: '#experiences', label: 'Expériences' },
    { href: '#steps', label: 'À quoi vous attendre' },
    { href: '#reserver', label: 'Réserver' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Accès' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');
    const [hidden, setHidden] = useState(false);

    // Effet header translucide au scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll spy
    useEffect(() => {
        const ids = ['hero', 'concept', 'experiences', 'steps', 'dataviz', 'reserver', 'faq', 'contact'];
        const targets = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`));
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        targets.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    // Hide on scroll down / show on scroll up — seulement < lg et hors menu ouvert
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            if (window.innerWidth >= 1024 || open) return; // desktop ou menu ouvert → pas de hide
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

    // Lock scroll quand le menu est ouvert
    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    // Fermer au change de hash (quand on clique un lien ancre)
    useEffect(() => {
        const handler = () => setOpen(false);
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);

    return (
        <header
            className={`
        fixed inset-x-0 top-0 z-50 transition-transform duration-300
        ${hidden ? '-translate-y-full md:-translate-y-full lg:translate-y-0' : 'translate-y-0'}
        ${scrolled ? 'bg-background/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-muted' : ''}
      `}
        >
            {/* fine gradient line */}
            <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] opacity-70 ${
                    scrolled ? '' : 'opacity-0'
                } transition-opacity`}
            />

            <div className="container flex items-center justify-between py-3 md:py-4">
                {/* Logo */}
                <Link href="#hero" className="flex items-center gap-2 hover:opacity-90 transition">
                    <span className="sr-only">Mystères à la Carte — Accueil</span>
                    <Image src="/logo.png" alt="Mystères à la Carte" width={180} height={40} className="h-8 w-auto md:h-9" priority sizes="(min-width:1024px) 180px, 140px" />
                </Link>

                {/* Nav desktop (≥ lg) */}
                <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`relative inline-block py-1 transition ${active === item.href ? 'text-primary' : 'hover:text-primary'} group`}
                        >
                            {item.label}
                            <span
                                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 ${
                                    active === item.href ? 'scale-x-100' : ''
                                }`}
                            />
                        </a>
                    ))}
                    <a href="#reserver" className="btn">
                        Réserver
                    </a>
                </nav>

                {/* Toggle mobile/tablette */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="lg:hidden p-2 rounded-xl border border-muted hover:bg-muted/20"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                >
                    {open ? <X /> : <Menu />}
                </motion.button>
            </div>

            {/* OVERLAY MOBILE/TABLET “radial reveal” + sheet draggable */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop avec reveal circulaire */}
                        <motion.div
                            key="backdrop"
                            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
                            initial={{ clipPath: 'circle(0% at 92% 0%)' }}
                            animate={{ clipPath: 'circle(150% at 92% 0%)', transition: { duration: 0.45, ease } }}
                            exit={{ clipPath: 'circle(0% at 92% 0%)', transition: { duration: 0.3, ease } }}
                            onClick={() => setOpen(false)}
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(1200px_480px_at_50%_15%,var(--color-primary)_0%,transparent_60%)]"
                            />
                        </motion.div>

                        {/* Sheet : drag to close */}
                        <MenuSheet active={active} onClose={() => setOpen(false)} />
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

/* -------- Sous-composant : sheet mobile/tablette -------- */

function MenuSheet({ active, onClose }: { active: string; onClose: () => void }) {
    return (
        <motion.aside
            key="sheet"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="lg:hidden fixed inset-x-0 top-0 z-50 origin-top rounded-b-2xl border-b border-white/10 bg-background/85 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
            initial={{ y: -28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.28, ease } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.22, ease } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
                if (info.offset.y > 80) onClose();
            }}
        >
            <div className="container py-4">
                {/* Top row (logo + close) */}
                <div className="flex items-center justify-between">
                    <Link href="#hero" onClick={onClose} className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Mystères à la Carte" width={150} height={36} className="h-8 w-auto" />
                    </Link>
                    <motion.button whileTap={{ scale: 0.96 }} className="p-2 rounded-xl border border-muted hover:bg-muted/20" onClick={onClose} aria-label="Fermer le menu">
                        <X />
                    </motion.button>
                </div>

                {/* Sections “Explorer” + “Réserver” */}
                <motion.div className="mt-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
                    {/* Explorer */}
                    <p className="px-1 pb-2 text-xs uppercase tracking-wide text-muted-foreground">Explorer</p>
                    <ul className="grid gap-1">
                        {NAV.filter((n) => n.href !== '#reserver').map((item) => (
                            <motion.li key={item.href} variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.28, ease } } }}>
                                <a
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-base transition
                    ${active === item.href ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30'}`}
                                >
                                    <span>{item.label}</span>
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA réserver */}
                    <div className="mt-4">
                        <a href="#reserver" onClick={onClose} className="btn w-full justify-center">
                            <UtensilsCrossed className="h-4 w-4" />
                            Réserver maintenant
                        </a>
                    </div>

                    {/* Bandeau infos */}
                    <div className="mt-3 text-xs text-muted-foreground text-center">Bastille, Paris • 60–90&nbsp;min • 2–6 joueurs</div>
                </motion.div>
            </div>

            {/* Bottom sticky with subtle gradient edge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background/90 to-transparent" />
        </motion.aside>
    );
}
