# Audit checklist — Mystère à la Carte

## Résumé — 3 priorités

Priorité 1 : clarifier les boundaries UI/domain/data pour réduire le couplage des composants monolithiques.
Priorité 2 : renforcer les garde-fous qualité (tests, CI, conventions lint/typing) pour éviter la régression silencieuse.
Priorité 3 : industrialiser perf/SEO/a11y (budgets, metadata, audits automatisés) sur la home one-page et les pages légales.

## P0 — À corriger immédiatement

- [x] Supprimer la dépendance `nodemailer` et `@types/nodemailer` de `package.json` tant qu’aucun envoi serveur n’existe, pour réduire la surface supply-chain inutile. (Impact: High | Effort: S | Risk: Low)

## 1) Repo & Conventions

### Structure globale

- [x] Définir une convention d’organisation cible dans `README.md` (ex: `features/`, `shared/`, `app/`) et l’appliquer aux nouveaux fichiers de `src/`. (Impact: High | Effort: M | Risk: Low)
- [x] Ajouter un guide de nommage (PascalCase composants, camelCase hooks/utilitaires, kebab-case segments route) dans `README.md`. (Impact: Med | Effort: S | Risk: Low)
- [x] Centraliser les constantes de contenu (`NAV`, `MENUS`, textes légaux) dans des modules dédiés plutôt que dans `src/components/Header.tsx`, `src/components/BookingForm.tsx` et `src/app/*/page.tsx`. (Impact: High | Effort: M | Risk: Low)

### Conventions de code

- [x] Ajouter des règles ESLint de complexité/taille de fichier (ex: `max-lines`, `complexity`) pour prévenir les composants >150 lignes dans `src/components/*.tsx`. (Impact: Med | Effort: S | Risk: Low)
- [x] Remplacer les casts `as unknown as number` dans `src/components/BookingForm.tsx` par un typage RHF explicite (`setValueAs` ou schéma coercitif). (Impact: High | Effort: S | Risk: Low)

## 2) Architecture & Boundaries

### Découpage par responsabilités

- [x] Extraire la logique métier du formulaire (`schema`, defaults, mapping menu) de `src/components/BookingForm.tsx` vers `src/features/booking/{model,constants}.ts`. (Impact: High | Effort: M | Risk: Med)
- [x] Isoler la logique de navigation/scroll-spy de `src/components/Header.tsx` dans un hook `useHeaderNavigation` pour séparer UI et side effects. (Impact: High | Effort: M | Risk: Med)
- [x] Créer une couche `shared/ui` pour les primitives réutilisées (`ScrollReveal`, `Magnetic`, boutons) actuellement dispersées dans `src/components/FX/UI/` et `src/app/globals.css`. (Impact: Med | Effort: M | Risk: Low)

### Dépendances et couplages

- [x] Introduire des règles de boundary d’import (ex: via `eslint-plugin-boundaries`) pour empêcher `app/` de dépendre d’implémentations `features/*/internal`. (Impact: Med | Effort: M | Risk: Low)
- [x] Limiter la dépendance directe de `src/app/page.tsx` à des composants orchestrateurs de section (pas aux implémentations internes). (Impact: Med | Effort: M | Risk: Low)

## 3) Components & UI Patterns

### Taille et lisibilité

- [ ] Scinder `src/components/BookingForm.tsx` en sous-composants (`BookingFields`, `BookingConsent`, `BookingActions`) pour améliorer la lisibilité et la testabilité. (Impact: High | Effort: M | Risk: Med)
- [ ] Scinder `src/components/Header.tsx` (desktop nav, mobile sheet, hooks de scroll) en composants dédiés. (Impact: High | Effort: M | Risk: Med)
- [ ] Scinder `src/components/NotFoundView.tsx` en blocs (hero, recherche, raccourcis, actions) avec props explicites. (Impact: Med | Effort: M | Risk: Low)

### Patterns UI

- [ ] Créer des primitives `SectionTitle` et `SectionDivider` pour réduire la duplication des motifs h2 + ligne d’accent dans `Concept`, `Menus`, `Steps`, `Dataviz`, `BookingForm`, `FAQ`, `Contact`. (Impact: Med | Effort: M | Risk: Low)
- [ ] Uniformiser les variants CTA (`btn`, `btn-ghost`) via un composant `Button` typé pour éviter les divergences de classes Tailwind. (Impact: Med | Effort: M | Risk: Low)

## 4) State / Data / Side Effects

### Gestion d’état local

- [ ] Isoler la machine d’état du formulaire (`idle/loading/success/error`) dans un hook `useBookingSubmission` pour clarifier la logique de transitions. (Impact: High | Effort: M | Risk: Med)
- [ ] Encapsuler la logique `sessionStorage`/timers de `src/components/FX/UI/Splash.tsx` dans un hook robuste avec nettoyage systématique des timeouts. (Impact: Med | Effort: S | Risk: Low)

### Side effects navigateur

- [ ] Créer un utilitaire partagé pour l’abonnement/désabonnement d’événements scroll/wheel utilisé dans `Header.tsx` et `ScrollOrchestrator.tsx`. (Impact: Med | Effort: M | Risk: Low)
- [ ] Ajouter des garde-fous de fallback si `IntersectionObserver` n’est pas disponible dans `src/components/Header.tsx`. (Impact: Med | Effort: S | Risk: Low)

## 5) Typescript & Type Safety

- [ ] Activer `noUncheckedIndexedAccess` et `exactOptionalPropertyTypes` dans `tsconfig.json` pour réduire les erreurs de nullabilité implicite. (Impact: Med | Effort: S | Risk: Med)
- [ ] Désactiver `allowJs` dans `tsconfig.json` si aucun fichier JS n’est requis. (Impact: Med | Effort: S | Risk: Low)
- [ ] Remplacer les types ad hoc de `src/components/Dataviz.tsx` par les types officiels Recharts importés pour éviter les divergences API. (Impact: Med | Effort: S | Risk: Low)
- [ ] Ajouter des types partagés de domaine (`MenuId`, `BookingRequest`) dans `src/types/booking.ts` pour supprimer la duplication de littéraux. (Impact: High | Effort: S | Risk: Low)

## 6) Performance (LCP/CLS/INP)

### Chargement et bundles

- [ ] Dynamiser le chargement de `Dataviz` dans `src/app/page.tsx` (comme annoncé dans le README) pour éviter de charger Recharts sur l’entrée critique. (Impact: High | Effort: S | Risk: Low)
- [ ] Mesurer la taille JS de chaque composant FX (`TopLoader`, `CursorGlow`, `Splash`, `ScrollProgress`) et conditionner leur montage selon viewport/préférences utilisateur. (Impact: Med | Effort: M | Risk: Low)

### Rendu et interactions

- [ ] Éviter les listeners scroll multiples dans `Header.tsx` en mutualisant la lecture de `window.scrollY` via un seul handler throttle. (Impact: Med | Effort: M | Risk: Med)
- [ ] Ajouter un budget Web Vitals (LCP/CLS/INP) dans CI avec seuils et échec de pipeline. (Impact: High | Effort: M | Risk: Med)

## 7) SEO & Metadata

- [ ] Compléter `metadata` dans `src/app/layout.tsx` avec `alternates.canonical`, `keywords`, `authors`, `category`. (Impact: Med | Effort: S | Risk: Low)
- [ ] Ajouter des metadata spécifiques aux pages légales (`openGraph`, canonical) dans `src/app/legal-notice/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`. (Impact: Med | Effort: S | Risk: Low)
- [ ] Vérifier la cohérence `NEXT_PUBLIC_SITE_URL` (trailing slash) dans `layout.tsx`, `robots.ts`, `sitemap.ts` pour éviter les URL doubles. (Impact: Med | Effort: S | Risk: Low)

## 8) Accessibilité (a11y)

- [ ] Ajouter une gestion clavier complète (focus trap, retour focus) pour le menu mobile de `src/components/Header.tsx`. (Impact: High | Effort: M | Risk: Med)
- [ ] Ajouter `aria-live="assertive"` et rôles adaptés pour les erreurs de formulaire dans `src/components/BookingForm.tsx`. (Impact: Med | Effort: S | Risk: Low)
- [ ] Vérifier et corriger la hiérarchie de titres sur les pages légales `src/app/*/page.tsx` pour garantir une structure cohérente H1→H2. (Impact: Med | Effort: S | Risk: Low)
- [ ] Ajouter des tests automatisés axe (home + not-found + pages légales). (Impact: High | Effort: M | Risk: Low)

## 9) Testing & Quality Gates

- [ ] Mettre en place Vitest + Testing Library et couvrir `BookingForm`, `Header`, `ToastProvider`, `NotFoundView`. (Impact: High | Effort: M | Risk: Med)
- [ ] Ajouter des tests d’intégration Playwright pour les parcours critiques (navigation ancre, soumission formulaire démo, page 404). (Impact: High | Effort: M | Risk: Med)
- [ ] Ajouter un script `npm run typecheck` (`tsc --noEmit`) et l’imposer en CI. (Impact: High | Effort: S | Risk: Low)
- [ ] Ajouter un seuil de couverture minimal (ex: 70%) avant merge. (Impact: Med | Effort: S | Risk: Low)

## 10) Tooling (ESLint/Prettier/CI)

- [ ] Ajouter Prettier + `eslint-config-prettier` et un script `format:check` pour stabiliser le style. (Impact: Med | Effort: S | Risk: Low)
- [ ] Étendre `eslint.config.mjs` avec règles `import/order`, `unused-imports`, `no-console` (allowlist démo documentée). (Impact: Med | Effort: S | Risk: Low)
- [ ] Créer un pipeline CI (lint + typecheck + tests + build) via GitHub Actions. (Impact: High | Effort: M | Risk: Low)
- [ ] Ajouter un contrôle des dépendances vulnérables (`npm audit --audit-level=high`) en CI. (Impact: Med | Effort: S | Risk: Low)

## 11) Docs & Developer Experience

- [ ] Créer `docs/architecture.md` avec responsabilités de couches (`app`, `features`, `shared`, `services`). (Impact: High | Effort: S | Risk: Low)
- [ ] Documenter dans `README.md` les décisions de perf (FX opt-in, lazy loading, reduced motion) et leurs limites. (Impact: Med | Effort: S | Risk: Low)
- [ ] Ajouter un fichier `.env.example` (ex: `NEXT_PUBLIC_SITE_URL`) et les conventions d’environnement. (Impact: Med | Effort: S | Risk: Low)
- [ ] Ajouter des scripts DX (`dev:strict`, `check:all`) pour faciliter l’onboarding. (Impact: Med | Effort: S | Risk: Low)

## 12) Security & Robustness

- [ ] Ajouter des headers de sécurité (CSP, X-Frame-Options, Referrer-Policy) dans `next.config.ts`. (Impact: High | Effort: M | Risk: Med)
- [ ] Vérifier et documenter la politique de liens externes (`rel="noreferrer noopener"`) sur tout `target="_blank"` des pages légales et footer. (Impact: Med | Effort: S | Risk: Low)
- [ ] Encadrer le logging navigateur de données utilisateur dans `BookingForm.tsx` derrière un flag de développement explicite. (Impact: High | Effort: S | Risk: Low)
- [ ] Ajouter une page d’erreur globale `src/app/error.tsx` avec fallback utilisateur et journalisation minimale. (Impact: Med | Effort: S | Risk: Low)
