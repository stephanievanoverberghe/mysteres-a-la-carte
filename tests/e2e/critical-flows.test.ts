import assert from 'node:assert/strict';
import test from 'node:test';

const baseUrl = process.env.E2E_BASE_URL;

test('critical routes respond with successful status', { skip: !baseUrl }, async () => {
  assert.ok(baseUrl, 'E2E_BASE_URL is required to run integration checks');

  const [home, notFound] = await Promise.all([
    fetch(new URL('/', baseUrl)),
    fetch(new URL('/route-qui-nexiste-pas', baseUrl)),
  ]);

  assert.equal(home.status, 200);
  assert.equal(notFound.status, 404);
});
