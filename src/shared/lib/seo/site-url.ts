const DEFAULT_SITE_URL = 'https://mysteres-a-la-carte.vercel.app';

/**
 * Normalize une URL en supprimant les slashs finaux pour éviter les doubles séparateurs.
 */
function stripTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '');
}

/**
 * Retourne l'URL publique du site depuis l'environnement avec un fallback stable.
 */
export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return stripTrailingSlashes(
    configuredUrl && configuredUrl.length > 0 ? configuredUrl : DEFAULT_SITE_URL,
  );
}

/**
 * Expose l'URL du site en objet `URL` pour factoriser les constructions d'URLs absolues.
 */
export function getSiteUrlObject(): URL {
  return new URL(`${getSiteUrl()}/`);
}

/**
 * Construit une URL canonique absolue à partir d'un chemin relatif.
 */
export function buildCanonicalUrl(path: string): string {
  return new URL(path, getSiteUrlObject()).toString();
}
