import { expect, test } from '@playwright/test';

test('navigation ancre vers réserver', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Réserver' }).first().click();

  await expect(page).toHaveURL(/#reserver/);
  await expect(page.locator('#reserver')).toBeVisible();
});

test('soumission formulaire démo avec succès', async ({ page }) => {
  await page.goto('/#reserver');

  await page.getByLabel('Nom', { exact: true }).fill('Test QA');
  await page.getByLabel('Email', { exact: true }).fill('qa@example.com');
  await page.getByLabel('Téléphone', { exact: true }).fill('0601020304');
  await page.getByLabel('Date', { exact: true }).fill('2026-06-15');
  await page.getByLabel('Heure', { exact: true }).fill('19:30');
  await page.getByLabel('Nombre de personnes', { exact: true }).fill('4');
  await page.getByLabel(/J’accepte que mes informations/).check();

  await page.getByRole('button', { name: 'Envoyer la demande' }).click();

  await expect(page.getByRole('dialog', { name: 'Demande envoyée ✅' })).toBeVisible();
});

test('page 404 affiche la vue dédiée', async ({ page }) => {
  const response = await page.goto('/route-qui-nexiste-pas');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /Page introuvable/i })).toBeVisible();
});
