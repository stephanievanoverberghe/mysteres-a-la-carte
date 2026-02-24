const DEFAULT_SITE_URL = 'https://mysteres-a-la-carte.vercel.app';

function stripTrailingSlashes(value: string): string {
    return value.replace(/\/+$/, '');
}

export function getSiteUrl(): string {
    const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    return stripTrailingSlashes(configuredUrl && configuredUrl.length > 0 ? configuredUrl : DEFAULT_SITE_URL);
}

export function getSiteUrlObject(): URL {
    return new URL(`${getSiteUrl()}/`);
}

export function buildCanonicalUrl(path: string): string {
    return new URL(path, getSiteUrlObject()).toString();
}
