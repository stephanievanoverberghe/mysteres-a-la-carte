'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, ArrowUp, Mail } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const year = new Date().getFullYear();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        // MVP: on log en console (pas d’API)
        console.log('[Newsletter DEMO] email:', email);
        setSent(true);
        setEmail('');
    };

    return (
        <footer aria-labelledby="footer-title" className="relative mt-24">
            <div className="container">
                {/* ligne d’accent */}
                <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 py-12 text-center md:text-left">
                    {/* Brand + pitch */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
                        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                        className="lg:col-span-2"
                    >
                        <h3 id="footer-title" className="text-xl font-semibold">
                            Mystères à la carte
                        </h3>
                        <p className="mt-3 max-w-md text-muted-foreground">
                            L’escape game culinaire à <span className="text-foreground">Bastille</span>. Résolvez l’énigme, dégustez la solution.
                        </p>

                        {/* Newsletter (console log en MVP) */}
                        <form onSubmit={submit} className="mt-6 flex flex-col md:flex-row gap-3">
                            <label htmlFor="nl" className="sr-only">
                                Votre email
                            </label>
                            <input
                                id="nl"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Votre email"
                                className="min-w-0 flex-1 rounded-xl border border-muted bg-background/60 px-3 py-2"
                                autoComplete="email"
                            />
                            <button type="submit" className="btn inline-flex items-center gap-2  w-full justify-center md:w-auto cursor-pointer">
                                <Mail className="h-4 w-4" />
                                S’abonner
                            </button>
                        </form>
                        {sent && <p className="mt-2 text-sm text-green-400">Merci ! Vous recevrez nos prochaines dates.</p>}

                        {/* Réseaux */}
                        <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
                            <Social href="https://instagram.com" label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </Social>
                            <Social href="https://facebook.com" label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </Social>
                            <Social href="https://youtube.com" label="YouTube">
                                <Youtube className="h-5 w-5" />
                            </Social>
                        </div>
                    </motion.div>

                    {/* Liens 1 */}
                    <motion.nav
                        aria-label="Explorer"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.05 } }}
                        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                        className="text-sm"
                    >
                        <h4 className="font-medium">Explorer</h4>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <Li href="#concept">Concept</Li>
                            <Li href="#menus">Menus</Li>
                            <Li href="#dataviz">Le saviez-vous ?</Li>
                            <Li href="#reserver">Réserver</Li>
                            <Li href="#faq">FAQ</Li>
                            <Li href="#contact">Contact</Li>
                        </ul>
                    </motion.nav>

                    {/* Liens 2 */}
                    <motion.nav
                        aria-label="Légal"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: 0.1 } }}
                        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
                        className="text-sm"
                    >
                        <h4 className="font-medium">Légal</h4>
                        <ul className="mt-3 space-y-2 text-muted-foreground">
                            <Li href="/legal-notice">Mentions légales</Li>
                            <Li href="/terms">CGV</Li>
                            <Li href="/privacy-policy">Confidentialité</Li>
                        </ul>
                    </motion.nav>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col gap-4 border-t border-muted/60 py-6 md:flex-row md:items-center md:justify-between text-sm text-center md:text-left">
                    <p className="text-muted-foreground">© {year} Mystères à la carte — Tous droits réservés.</p>
                    <div className="flex items-center gap-3">
                        <a href="#top" className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                            <ArrowUp className="h-4 w-4" />
                            Haut de page
                        </a>
                    </div>
                </div>
            </div>

            {/* Glow discret */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(900px_400px_at_80%_0%,var(--color-primary)_0%,transparent_60%)]"
            />
        </footer>
    );
}

/* ——— Petits sous-composants ——— */

function Li({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <a href={href} className="underline underline-offset-4 decoration-transparent hover:decoration-current hover:text-primary transition-colors">
                {children}
            </a>
        </li>
    );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted bg-background/60 hover:text-primary hover:border-primary transition-colors"
            title={label}
        >
            {children}
        </a>
    );
}
