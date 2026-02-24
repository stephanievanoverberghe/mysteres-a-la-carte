import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCanonicalUrl, getSiteUrl, getSiteUrlObject } from '../../src/shared/lib/seo/site-url.ts';

test('getSiteUrl uses default URL when env is undefined', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(getSiteUrl(), 'https://mysteres-a-la-carte.vercel.app');
});

test('getSiteUrl strips trailing slashes from configured URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com///';
    assert.equal(getSiteUrl(), 'https://example.com');
});

test('buildCanonicalUrl returns normalized absolute URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/';
    assert.equal(getSiteUrlObject().toString(), 'https://example.com/');
    assert.equal(buildCanonicalUrl('/privacy-policy'), 'https://example.com/privacy-policy');
});
