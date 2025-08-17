import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Politique de confidentialité — Mystères à la carte',
    description: 'Site démo one-page pour portfolio : aucun back-end, aucune conservation des données. Politique de confidentialité en français.',
    robots: { index: true, follow: true },
};

const SITE = {
    name: 'Mystères à la carte',
    nature: 'Site démo one-page à des fins de portfolio (aucune activité commerciale).',
    owner: 'Alchimiste Créations / Stéphanie Vanoverberghe',
    address: 'Bastille, 75011 Paris, France',
    email: 'orangestreet@live.fr',
    phone: '+33 1 23 45 67 89',
    host: {
        name: 'Vercel, Inc.',
        url: 'https://vercel.com',
        privacy: 'https://vercel.com/legal/privacy-policy',
    },
    services: {
        googleMaps: 'https://policies.google.com/privacy',
    },
    lastUpdate: '17/08/2025',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="relative">
            <div className="container py-16 md:py-24">
                {/* Fil d’Ariane */}
                <nav aria-label="Fil d’ariane" className="text-sm text-muted-foreground">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="underline underline-offset-4 hover:text-primary">
                                Accueil
                            </Link>
                        </li>
                        <li aria-hidden>›</li>
                        <li aria-current="page" className="text-foreground">
                            Politique de confidentialité
                        </li>
                    </ol>
                </nav>

                <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Politique de confidentialité</h1>
                <p className="mt-2 text-muted-foreground">Dernière mise à jour&nbsp;: {SITE.lastUpdate}</p>

                <div className="mt-8 grid gap-8">
                    {/* 1. Qui sommes-nous */}
                    <section aria-labelledby="pp-qui" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-qui" className="text-xl font-semibold">
                            1. Qui sommes-nous
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                <strong>{SITE.name}</strong> — {SITE.nature}
                            </p>
                            <p className="mt-2">
                                Éditeur / Responsable du traitement&nbsp;: <strong>{SITE.owner}</strong>
                                <br />
                                Adresse&nbsp;: {SITE.address}
                                <br />
                                Contact&nbsp;:{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE.email}`}>
                                    {SITE.email}
                                </a>{' '}
                                —{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>
                                    {SITE.phone}
                                </a>
                            </p>
                        </div>
                    </section>

                    {/* 2. Champ d’application */}
                    <section aria-labelledby="pp-champ" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-champ" className="text-xl font-semibold">
                            2. Champ d’application
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Cette politique explique quelles données personnelles sont (ou ne sont pas) traitées lorsque vous naviguez sur ce site de démonstration, utilisez ses
                            formulaires intégrés ou interagissez avec des services embarqués.
                        </p>
                    </section>

                    {/* 3. Données personnelles traitées */}
                    <section aria-labelledby="pp-donnees" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-donnees" className="text-xl font-semibold">
                            3. Données personnelles traitées
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                <strong>Aucun back-end n’est connecté.</strong> Les formulaires (réservation, newsletter) sont purement côté client à des fins de démonstration. Les
                                valeurs saisies <strong>ne sont pas transmises à un serveur</strong> et sont uniquement affichées dans la console de votre navigateur. Pas de
                                compte, pas de paiement, pas de base de données.
                            </p>
                            <p>
                                En conséquence, <strong>nous ne stockons ni ne conservons vos données personnelles côté serveur</strong> lorsque vous utilisez ce site.
                            </p>
                        </div>
                    </section>

                    {/* 4. Cookies & stockage local */}
                    <section aria-labelledby="pp-cookies" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-cookies" className="text-xl font-semibold">
                            4. Cookies &amp; stockage local
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                Ce site utilise un stockage local minimal pour le confort d’usage (pas de cookies publicitaires, pas d’analytics activés par défaut). Exemple&nbsp;:
                                un indicateur de session pour éviter d’afficher l’écran d’intro à chaque chargement.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="mt-2 w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-muted">
                                            <th className="py-2 pr-4">Nom</th>
                                            <th className="py-2 pr-4">Type</th>
                                            <th className="py-2 pr-4">Finalité</th>
                                            <th className="py-2">Durée</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-top">
                                        <tr className="border-b border-muted/60">
                                            <td className="py-2 pr-4">
                                                <code>mac_splash_seen</code>
                                            </td>
                                            <td className="py-2 pr-4">sessionStorage</td>
                                            <td className="py-2 pr-4">Mémorise si l’écran d’introduction a déjà été affiché.</td>
                                            <td className="py-2">Jusqu’à la fermeture de l’onglet.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                Vous pouvez supprimer ou bloquer ces éléments via les réglages de votre navigateur. La désactivation n’affectera que des effets visuels non
                                critiques.
                            </p>
                        </div>
                    </section>

                    {/* 5. Services tiers */}
                    <section aria-labelledby="pp-tiers" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-tiers" className="text-xl font-semibold">
                            5. Services tiers
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                Hébergement&nbsp;:{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={SITE.host.url} target="_blank" rel="noreferrer">
                                    {SITE.host.name}
                                </a>{' '}
                                —{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={SITE.host.privacy} target="_blank" rel="noreferrer">
                                    Politique de confidentialité
                                </a>
                                .
                            </p>
                            <p>
                                Cartes&nbsp;: une iframe Google Maps est intégrée dans la section Contact. Google peut traiter des données techniques (IP, appareil) selon sa propre
                                politique&nbsp;:{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={SITE.services.googleMaps} target="_blank" rel="noreferrer">
                                    Règles de confidentialité Google
                                </a>
                                .
                            </p>
                            <p>Nous ne maîtrisons pas les pratiques des tiers. Veuillez consulter leurs politiques pour plus de détails.</p>
                        </div>
                    </section>

                    {/* 6. Vos droits */}
                    <section aria-labelledby="pp-droits" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-droits" className="text-xl font-semibold">
                            6. Vos droits
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed">
                            <p>
                                Comme ce site démo ne stocke pas vos données, il n’y a généralement rien à accéder, corriger ou supprimer. Vous pouvez toutefois nous écrire à{' '}
                                <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE.email}`}>
                                    {SITE.email}
                                </a>{' '}
                                pour toute question relative à la vie privée. En cas de litige, vous pouvez également contacter votre autorité locale (ex.&nbsp;CNIL).
                            </p>
                        </div>
                    </section>

                    {/* 7. Durées de conservation */}
                    <section aria-labelledby="pp-durees" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-durees" className="text-xl font-semibold">
                            7. Durées de conservation
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Aucune conservation côté serveur. Les indicateurs de session sont effacés à la fermeture de l’onglet ; les autres éléments (le cas échéant) peuvent être
                            supprimés à tout moment via votre navigateur.
                        </p>
                    </section>

                    {/* 8. Modifications */}
                    <section aria-labelledby="pp-modifs" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-modifs" className="text-xl font-semibold">
                            8. Modifications de cette politique
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Cette page pourra évoluer (ex.&nbsp;activation d’analytics ou ajout d’un back-end). Les changements significatifs seront indiqués en mettant à jour la
                            date ci-dessus.
                        </p>
                    </section>

                    {/* 9. Contact */}
                    <section aria-labelledby="pp-contact" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="pp-contact" className="text-xl font-semibold">
                            9. Contact
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Email&nbsp;:{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE.email}`}>
                                {SITE.email}
                            </a>{' '}
                            — Téléphone&nbsp;:{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href={`tel:${SITE.phone.replace(/\s+/g, '')}`}>
                                {SITE.phone}
                            </a>
                        </p>
                    </section>
                </div>

                {/* Retour */}
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
