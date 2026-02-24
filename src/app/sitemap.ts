import type { MetadataRoute } from 'next';
import { getSiteUrlObject } from '@/shared/lib/seo/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = getSiteUrlObject();
    const routes = ['/', '/privacy-policy', '/terms', '/legal-notice'];
    const now = new Date().toISOString();

    return routes.map((path) => ({
        url: new URL(path, base).toString(),
        lastModified: now,
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : 0.6,
    }));
}
