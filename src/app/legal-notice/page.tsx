import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_INFO } from '@/content/site';

export const metadata: Metadata = {
    title: 'Mentions légales — Mystères à la carte',
    description: 'Informations légales du site démo Mystères à la carte.',
    robots: { index: true, follow: true },
};

export default function legalNoticePage() {
    return (
        <main className="relative">
            <div className="container py-16 md:py-24">
                {/* Titre + breadcrumb */}
                <nav aria-label="Fil d’ariane" className="text-sm text-muted-foreground">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="underline underline-offset-4 hover:text-primary">
                                Accueil
                            </Link>
                        </li>
                        <li aria-hidden>›</li>
                        <li aria-current="page" className="text-foreground">
                            Mentions légales
                        </li>
                    </ol>
                </nav>

                <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Mentions légales</h1>
                <p className="mt-2 text-muted-foreground">Dernière mise à jour&nbsp;: {SITE_INFO.lastUpdate}</p>

                <div className="mt-8 grid gap-8">
                    {/* 1. Éditeur */}
                    <section aria-labelledby="ml-editeur" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-editeur" className="text-xl font-semibold">
                            1. Éditeur du site
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                <strong>{SITE_INFO.name}</strong> — {SITE_INFO.nature}
                            </p>
                            <p className="mt-2">
                                Éditeur / responsable de la publication&nbsp;: <strong>{SITE_INFO.owner}</strong>
                                <br />
                                Adresse&nbsp;: {SITE_INFO.address}
                                <br />
                                Contact&nbsp;:{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE_INFO.email}`}>
                                    {SITE_INFO.email}
                                </a>{' '}
                                —{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`tel:${SITE_INFO.phone.replace(/\s+/g, '')}`}>
                                    {SITE_INFO.phone}
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* 2. Hébergeur */}
                    <section aria-labelledby="ml-hebergeur" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-hebergeur" className="text-xl font-semibold">
                            2. Hébergement
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Site hébergé par <strong>{SITE_INFO.host.name}</strong> —{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={SITE_INFO.host.site} target="_blank" rel="noreferrer">
                                    {SITE_INFO.host.site}
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* 3. Propriété intellectuelle */}
                    <section aria-labelledby="ml-ip" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-ip" className="text-xl font-semibold">
                            3. Propriété intellectuelle
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Les contenus, marques, éléments graphiques et visuels présentés sur ce site sont protégés par le droit d’auteur et le droit des marques. Toute
                                reproduction, adaptation ou diffusion non autorisée est interdite. Les visuels de démonstration restent la propriété de leurs ayants droit.
                            </p>
                        </div>
                    </section>

                    {/* 4. Données personnelles & cookies */}
                    <section aria-labelledby="ml-rgpd" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-rgpd" className="text-xl font-semibold">
                            4. Données personnelles &amp; cookies
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                Ce site est une <strong>démo “one-page” sans back-end</strong>. Les formulaires (réservation, newsletter) n’effectuent{' '}
                                <strong>aucun envoi serveur</strong> : les données saisies sont simplement <strong>affichées dans la console du navigateur</strong> à des fins de
                                démonstration.
                            </p>
                            <p>
                                Aucune création de compte, aucun paiement et aucune base de données n’est utilisée. À ce titre,{' '}
                                <strong>aucune donnée personnelle n’est stockée ni transmise</strong> par le site.
                            </p>
                            <p>
                                Cookies&nbsp;: uniquement les cookies techniques nécessaires au bon fonctionnement (le cas échéant). Aucun cookie publicitaire. Aucune mesure
                                d’audience n’est activée par défaut.
                            </p>
                            <p>
                                Pour toute question liée à la confidentialité, vous pouvez écrire à&nbsp;:
                                <a className="underline underline-offset-4 hover:text-primary ml-1" href={`mailto:${SITE_INFO.email}`}>
                                    {SITE_INFO.email}
                                </a>
                                .
                            </p>
                        </div>
                    </section>

                    {/* 5. Responsabilité */}
                    <section aria-labelledby="ml-resp" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-resp" className="text-xl font-semibold">
                            5. Responsabilité
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Malgré le soin apporté à la mise à jour, des erreurs ou indisponibilités peuvent survenir. L’éditeur ne saurait être tenu responsable des dommages
                                directs ou indirects résultant de l’utilisation du site ou de l’impossibilité d’y accéder.
                            </p>
                        </div>
                    </section>

                    {/* 6. Liens externes */}
                    <section aria-labelledby="ml-liens" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-liens" className="text-xl font-semibold">
                            6. Liens externes
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Les liens vers des sites tiers sont fournis à titre informatif. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à
                                leur égard.
                            </p>
                        </div>
                    </section>

                    {/* 7. Droit applicable */}
                    <section aria-labelledby="ml-droit" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-droit" className="text-xl font-semibold">
                            7. Droit applicable
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
                            </p>
                        </div>
                    </section>

                    {/* 8. Contact */}
                    <section aria-labelledby="ml-contact" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="ml-contact" className="text-xl font-semibold">
                            8. Contact
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE_INFO.email}`}>
                                    {SITE_INFO.email}
                                </a>{' '}
                                —{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`tel:${SITE_INFO.phone.replace(/\s+/g, '')}`}>
                                    {SITE_INFO.phone}
                                </a>
                            </p>
                        </div>
                    </section>
                </div>

                {/* retour */}
                <div className="mt-10">
                    <Link href="/" className="btn">
                        Retour à l’accueil
                    </Link>
                </div>
            </div>

            {/* Glow décoratif */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(900px_360px_at_80%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </main>
    );
}
