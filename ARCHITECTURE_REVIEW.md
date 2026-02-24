# Architecture Review — Mystère à la Carte

## A) Carte du projet

### Framework + router

- Next.js 15 avec **App Router** (`src/app`), rendu majoritairement statique.
- Home one-page (`/`) composée d’un enchaînement de sections React.

### Arborescence résumée

- `src/app/`: layout global, page d’accueil, 404/not-found, robots/sitemap, pages légales.
- `src/components/`: sections de page + composants transverses.
- `src/components/FX/`: effets visuels (scroll, cursor, splash, toasts, loaders).
- `public/`: assets images (hero, menus, étapes, OG, logo).
- Racine: config minimale (`next.config.ts`, `eslint.config.mjs`, `tsconfig.json`).

### Pages / routes principales

- `/` (`src/app/page.tsx`) : Header + 8 sections + Footer.
- `/privacy-policy`, `/terms`, `/legal-notice` : pages légales dédiées.
- `not-found` custom via `src/app/not-found.tsx` + `src/components/NotFoundView.tsx`.

### Patterns existants

- **Components UI**: sections standalone (`Hero`, `Concept`, `Menus`, etc.).
- **Hooks implicites**: logique locale dans composants (pas de dossier `hooks/`).
- **Utils/lib/services**: quasi absents ; logique métier et constantes majoritairement inline.
- **FX layer**: sous-système `FX/UI` + `FX/ScrollFX` monté globalement depuis `layout.tsx`.

### Où vivent types, data et primitives UI

- Types: principalement inline dans les composants (ex: `Dataviz`, `BookingForm`).
- Data statique: inline dans les composants (`NAV`, `MENUS`, FAQ/items, etc.).
- Primitives UI: mélange entre classes utilitaires globales (`globals.css`) et composants `FX/UI`.

---

## B) Constats majeurs

### 1) Composants monolithiques

- **Symptôme**: `BookingForm.tsx`, `Header.tsx`, `NotFoundView.tsx` sont volumineux et mélangent affichage, état, effets, accessibilité.
- **Cause probable**: itérations rapides orientées livraison one-page sans extraction incrémentale.
- **Risque long terme**: coût de modification élevé, régressions UI/a11y difficiles à isoler.
- **Recommandation**: découper par responsabilités (container + sous-composants + hooks de logique).

### 2) Frontières architecture non explicites

- **Symptôme**: absence de séparation claire entre UI, domaine (booking), et logique d’effets navigateur.
- **Cause probable**: structure initiale `components/` unique suffisante pour MVP.
- **Risque long terme**: imports transverses incontrôlés, dette de couplage.
- **Recommandation**: introduire `features/` (métier), `shared/` (UI/utilitaires), `app/` (composition route).

### 3) Données métier et contenus dispersés

- **Symptôme**: constantes menus/navigation/textes légaux en inline dans plusieurs fichiers.
- **Cause probable**: optimisation locale de chaque composant.
- **Risque long terme**: incohérences éditoriales et duplication lors des updates.
- **Recommandation**: centraliser dans `features/*/constants.ts` et `content/*`.

### 4) Type safety contournée sur le formulaire

- **Symptôme**: usage de `as unknown as number` dans les valeurs par défaut RHF.
- **Cause probable**: friction entre `react-hook-form` et schéma Zod.
- **Risque long terme**: erreurs runtime silencieuses sur parsing des champs numériques.
- **Recommandation**: utiliser coercition Zod (`z.coerce.number`) ou `setValueAs` RHF, plus type métier partagé.

### 5) Contradiction perf doc vs implémentation

- **Symptôme**: README annonce un dataviz lazy, mais `Dataviz` est importé directement sur la home.
- **Cause probable**: évolution non resynchronisée entre code et documentation.
- **Risque long terme**: surcharge JS initiale et perte de confiance dans la doc technique.
- **Recommandation**: passer `Dataviz` en dynamic import non bloquant, puis aligner README.

### 6) Side effects navigateur multipliés

- **Symptôme**: plusieurs listeners scroll/wheel/timers indépendants (`Header`, `ScrollOrchestrator`, `Splash`).
- **Cause probable**: logique encapsulée composant par composant.
- **Risque long terme**: INP dégradé sur devices modestes, bugs de synchro.
- **Recommandation**: mutualiser les patterns (hooks partagés, throttling, nettoyage strict).

### 7) Qualité outillée incomplète

- **Symptôme**: lint présent mais pas de tests, pas de `typecheck` dédié, pas de CI.
- **Cause probable**: repo orienté démonstration visuelle.
- **Risque long terme**: régressions non détectées avant merge/deploy.
- **Recommandation**: instaurer quality gates minimales (lint+typecheck+tests+build).

### 8) Accessibilité correcte mais non industrialisée

- **Symptôme**: bonnes intentions (SkipLink, reduced-motion) mais pas de tests a11y automatisés.
- **Cause probable**: validation manuelle ponctuelle.
- **Risque long terme**: dette a11y progressive sur les évolutions de composants.
- **Recommandation**: ajouter axe/Playwright sur pages clés + checklist a11y PR.

### 9) Sécurité de configuration à renforcer

- **Symptôme**: `next.config.ts` vide, pas de headers de sécurité explicites.
- **Cause probable**: projet démo sans durcissement infra.
- **Risque long terme**: posture de sécurité insuffisante si le projet évolue vers production.
- **Recommandation**: ajouter CSP de base, Referrer-Policy, X-Frame-Options, audits dépendances.

---

## C) Cible proposée (simple et pragmatique)

### Conventions de dossiers

- `src/app/`: routing, layout, metadata, composition des pages.
- `src/features/<feature>/`: logique métier + composants feature-scoped.
- `src/shared/ui/`: primitives UI génériques (Button, SectionTitle, Modal, etc.).
- `src/shared/lib/`: utilitaires purs (formatting, guards, browser helpers).
- `src/services/`: accès externes (API clients, analytics, email mock).
- `src/types/`: types de domaine partagés.
- `src/content/`: contenus statiques éditoriaux (menus, FAQ, legal snippets).

### Règles de boundaries

- `app` peut importer `features`, `shared`, `types`, `content`.
- `features` peut importer `shared`, `types`, `content`, mais pas `app`.
- `shared` ne dépend d’aucune feature.
- `services` ne dépend pas de `app` ni de composants UI.
- Les composants d’animation/FX restent optionnels et encapsulés dans `features/fx` ou `shared/ui/fx`.

### Guidelines de nommage

- Composants: `PascalCase.tsx`.
- Hooks: `useXxx.ts`.
- Modules data/constants: `xxx.constants.ts`.
- Types domaine: `xxx.types.ts` ou dossier `types/<domain>.ts`.
- Fichiers de tests: `*.test.ts(x)` et `*.spec.ts(x)`.

### Emplacement recommandé des couches

- `features/booking`: schéma, hook de submit, composants formulaire.
- `features/navigation`: header/nav mobile/scroll-spy.
- `shared/ui`: `Button`, `SectionHeading`, `Divider`, `Toast`.
- `shared/lib`: hooks browser (`useScrollDirection`, `useSessionFlag`).
- `types/booking.ts`: `BookingRequest`, `MenuId`, DTO front.

### Exemple concret d’arborescence

```txt
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    legal-notice/page.tsx
    privacy-policy/page.tsx
    terms/page.tsx
  features/
    booking/
      components/
        BookingForm.tsx
        BookingFields.tsx
      hooks/
        useBookingSubmission.ts
      booking.constants.ts
      booking.schema.ts
    navigation/
      components/
        Header.tsx
        MobileMenu.tsx
      hooks/
        useHeaderNavigation.ts
  shared/
    ui/
      Button.tsx
      SectionHeading.tsx
      fx/
        ScrollReveal.tsx
        Magnetic.tsx
    lib/
      browser/
        useScrollDirection.ts
        useSessionFlag.ts
  content/
    menus.ts
    faq.ts
  services/
    telemetry/
      webVitals.ts
  types/
    booking.ts
```

---

## D) Plan de migration par lots (PRs)

### PR 1 — Stabilisation qualité minimale

- **Objectif**: ajouter quality gates de base sans toucher au design.
- **Fichiers touchés**: `package.json`, `eslint.config.mjs`, ajout CI (`.github/workflows/ci.yml`), config tests (`vitest.config.ts`), setup test.
- **Risques**: faible ; principalement scripts/tooling.
- **Comment tester**: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.

### PR 2 — Feature booking découplée

- **Objectif**: extraire schéma + constantes + hook de soumission hors `BookingForm`.
- **Fichiers touchés**: `src/components/BookingForm.tsx` (ou déplacement vers `features/booking`), nouveaux `booking.schema.ts`, `booking.constants.ts`, `useBookingSubmission.ts`, `types/booking.ts`.
- **Risques**: moyen (régression formulaire).
- **Comment tester**: soumission valide/invalide, honeypot, état loading/success/error, toast affiché.

### PR 3 — Navigation modulaire et a11y menu

- **Objectif**: découper `Header` + renforcer navigation clavier/focus management.
- **Fichiers touchés**: `src/components/Header.tsx` + nouveaux composants/hooks navigation.
- **Risques**: moyen (comportement mobile/tablette).
- **Comment tester**: ouverture/fermeture menu, tabulation, Escape, scroll lock, changement de hash.

### PR 4 — Perf ciblée home

- **Objectif**: lazy-load dataviz et rationaliser les listeners scroll.
- **Fichiers touchés**: `src/app/page.tsx`, `src/components/Dataviz.tsx`, hooks scroll partagés, README perf.
- **Risques**: faible à moyen (timing d’apparition section).
- **Comment tester**: lighthouse mobile, vérification LCP/INP, absence de saut visuel.

### PR 5 — SEO/a11y/security hardening

- **Objectif**: compléter metadata, headers sécurité, tests a11y automatisés.
- **Fichiers touchés**: `src/app/layout.tsx`, `src/app/*/page.tsx`, `next.config.ts`, tests Playwright/axe.
- **Risques**: faible (config + attributs sémantiques).
- **Comment tester**: validation des balises meta/canonical, scans axe, contrôle headers HTTP.
