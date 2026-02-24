import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_INFO } from '@/content/site';

export const metadata: Metadata = {
    title: 'Conditions générales — Mystères à la carte',
    description: 'Conditions générales d’utilisation (et de vente le cas échéant) pour le site démo “Mystères à la carte”. Pas de back-end, pas de vente en ligne.',
    robots: { index: true, follow: true },
};

export default function TermsPage() {
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
                            Conditions générales
                        </li>
                    </ol>
                </nav>

                <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Conditions générales</h1>
                <p className="mt-2 text-muted-foreground">Dernière mise à jour&nbsp;: {SITE_INFO.lastUpdate}</p>

                <div className="mt-8 grid gap-8">
                    {/* 1. Objet */}
                    <section aria-labelledby="t-objet" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-objet" className="text-xl font-semibold">
                            1. Objet
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Les présentes conditions générales encadrent l’accès et l’utilisation du site <strong>{SITE_INFO.name}</strong>, actuellement présenté comme un{' '}
                            <strong>{SITE_INFO.nature}</strong>. Le site ne permet pas la réalisation d’achats en ligne.
                        </p>
                    </section>

                    {/* 2. Accès au site */}
                    <section aria-labelledby="t-acces" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-acces" className="text-xl font-semibold">
                            2. Accès et disponibilité
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            L’accès au site est gratuit. Le site peut être momentanément indisponible en cas de maintenance, de mise à jour ou de force majeure. L’éditeur s’efforce
                            d’assurer l’accessibilité sans garantie d’absence d’erreurs.
                        </p>
                    </section>

                    {/* 3. Réservations (démo uniquement) */}
                    <section aria-labelledby="t-resa" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-resa" className="text-xl font-semibold">
                            3. Réservations — démonstration
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                Le formulaire de réservation a un <strong>rôle purement démonstratif</strong>. Les informations saisies ne sont
                                <strong> pas envoyées à un serveur</strong> et s’affichent uniquement dans la console du navigateur.
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Pas de création de compte, pas de paiement.</li>
                                <li>Pas d’engagement contractuel ni de confirmation effective.</li>
                                <li>
                                    Les prix affichés (le cas échéant) sont des <strong>exemples non contractuels</strong>.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. Propriété intellectuelle */}
                    <section aria-labelledby="t-ip" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-ip" className="text-xl font-semibold">
                            4. Propriété intellectuelle
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Les textes, visuels, éléments graphiques, logos, animations et codes sources du site sont protégés par le droit d’auteur. Toute reproduction,
                            modification ou diffusion sans autorisation est interdite. Les visuels de démonstration restent la propriété de leurs ayants droit.
                        </p>
                    </section>

                    {/* 5. Comportement des utilisateurs */}
                    <section aria-labelledby="t-usage" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-usage" className="text-xl font-semibold">
                            5. Bon usage du site
                        </h2>
                        <ul className="mt-3 text-sm leading-relaxed list-disc pl-5 space-y-1">
                            <li>Ne pas tenter d’altérer le fonctionnement du site ou d’accéder à des zones non publiques.</li>
                            <li>Ne pas injecter de contenus illicites, malveillants ou portant atteinte aux droits de tiers.</li>
                            <li>Respecter les lois et réglementations en vigueur.</li>
                        </ul>
                    </section>

                    {/* 6. Responsabilité */}
                    <section aria-labelledby="t-resp" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-resp" className="text-xl font-semibold">
                            6. Responsabilité
                        </h2>
                        <div className="mt-3 text-sm leading-relaxed space-y-3">
                            <p>
                                Le site est fourni «&nbsp;en l’état&nbsp;». Malgré le soin apporté, <strong>aucune garantie</strong> n’est donnée quant à l’exactitude,
                                l’exhaustivité ou l’absence d’erreurs. L’éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l’utilisation du
                                site ou de l’impossibilité d’y accéder.
                            </p>
                            <p>
                                Les liens vers des sites tiers sont fournis à titre informatif&nbsp;: l’éditeur n’exerce aucun contrôle sur leur contenu et décline toute
                                responsabilité à leur égard.
                            </p>
                        </div>
                    </section>

                    {/* 7. Données & confidentialité (rappel) */}
                    <section aria-labelledby="t-rgpd" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-rgpd" className="text-xl font-semibold">
                            7. Données personnelles — rappel
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Ce site démo ne stocke pas de données côté serveur. Pour plus d’informations, consultez la{' '}
                            <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
                                Politique de confidentialité
                            </Link>
                            .
                        </p>
                    </section>

                    {/* 8. Modification des conditions */}
                    <section aria-labelledby="t-modifs" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-modifs" className="text-xl font-semibold">
                            8. Modifications des présentes conditions
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Les conditions peuvent être mises à jour pour refléter l’évolution du site (ex.&nbsp;ajout d’un back-end ou de ventes en ligne). Les changements
                            significatifs seront signalés par la mise à jour de la date ci-dessus.
                        </p>
                    </section>

                    {/* 9. Droit applicable */}
                    <section aria-labelledby="t-droit" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-droit" className="text-xl font-semibold">
                            9. Droit applicable et litiges
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
                        </p>
                    </section>

                    {/* 10. Contact */}
                    <section aria-labelledby="t-contact" className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <h2 id="t-contact" className="text-xl font-semibold">
                            10. Contact
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed">
                            Pour toute question relative aux présentes conditions&nbsp;:{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${SITE_INFO.email}`}>
                                {SITE_INFO.email}
                            </a>{' '}
                            —{' '}
                            <a className="underline underline-offset-4 hover:text-primary" href={`tel:${SITE_INFO.phone.replace(/\s+/g, '')}`}>
                                {SITE_INFO.phone}
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
