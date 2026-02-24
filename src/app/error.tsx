'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[GlobalError]', {
      message: error.message,
      digest: error.digest,
    });
  }, [error.digest, error.message]);

  return (
    <main className="container py-20 md:py-28">
      <section
        className="mx-auto max-w-2xl rounded-2xl border border-muted bg-background/70 p-8 shadow-soft"
        aria-labelledby="global-error-title"
      >
        <p className="text-sm font-medium text-primary">Une erreur est survenue</p>
        <h1 id="global-error-title" className="mt-3 text-3xl font-semibold">
          Oups, la page a rencontré un problème.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Réessayez dans un instant. Si le problème persiste, revenez à l’accueil.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn">
            Réessayer
          </button>
          <a href="/" className="btn-ghost">
            Retour à l’accueil
          </a>
        </div>
      </section>
    </main>
  );
}
