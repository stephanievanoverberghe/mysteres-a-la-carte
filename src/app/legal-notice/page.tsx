import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL_NOTICE_SECTIONS } from '@/content/legal';
import { SITE_INFO } from '@/content/site';

export const metadata: Metadata = {
    title: 'Mentions légales — Mystères à la carte',
    description: 'Informations légales du site démo Mystères à la carte.',
    robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
    return (
        <main className="relative">
            <div className="container py-16 md:py-24">
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
                    {LEGAL_NOTICE_SECTIONS.map((section) => (
                        <section key={section.id} aria-labelledby={section.id} className="rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                            <h2 id={section.id} className="text-xl font-semibold">
                                {section.title}
                            </h2>
                            <div className="mt-3 text-sm leading-relaxed space-y-3">
                                {section.paragraphs?.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-10">
                    <Link href="/" className="btn">
                        Retour à l’accueil
                    </Link>
                </div>
            </div>
        </main>
    );
}
