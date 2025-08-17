'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV = [
    { href: '#concept', label: 'Concept' },
    { href: '#experiences', label: 'Expériences' },
    { href: '#steps', label: 'À quoi vous attendre' },
    { href: '#reserver', label: 'Réserver' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Accès' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('#hero');

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
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        targets.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition
      ${scrolled ? 'bg-background/80 backdrop-blur border-b border-muted' : ''}`}
        >
            <div className="container flex items-center justify-between py-4">
                {/* Logo / marque */}
                <Link href="#hero" className="font-semibold tracking-widest text-primary hover:opacity-90 transition">
                    Mystères à la Carte
                </Link>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`relative inline-block py-1 transition
                ${active === item.href ? 'text-primary' : 'hover:text-primary'}
                group`}
                        >
                            {item.label}
                            {/* soulignement animé */}
                            <span
                                className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100
                ${active === item.href ? 'scale-x-100' : ''}`}
                            />
                        </a>
                    ))}
                    <a href="#reserver" className="btn">
                        Réserver
                    </a>
                </nav>

                {/* Bouton mobile */}
                <button
                    className="md:hidden p-2 rounded-xl border border-muted hover:bg-muted/20"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Ouvrir le menu"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {/* Nav mobile */}
            <div
                id="mobile-nav"
                className={`md:hidden overflow-hidden border-t border-muted bg-background transition-[max-height,opacity]
        ${open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="container flex flex-col gap-2 py-4">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`py-2 rounded-lg px-2 transition
                ${active === item.href ? 'text-primary bg-muted/20' : 'hover:text-primary hover:bg-muted/10'}`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a href="#reserver" onClick={() => setOpen(false)} className="btn w-fit mt-2">
                        Réserver
                    </a>
                </div>
            </div>
        </header>
    );
}
