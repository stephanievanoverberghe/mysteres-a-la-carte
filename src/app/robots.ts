import { getSiteUrl } from '@/shared/lib/seo/site-url';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const host = getSiteUrl();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
