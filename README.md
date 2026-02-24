# Mystères à la carte

> One-page démo (portfolio) – **escape game culinaire** à Bastille (Paris).  
> Stack moderne (Next.js App Router, Tailwind v4, Framer Motion ciblé) + micro-FX, accessibilité et SEO propres.

![Open Graph](/public/og.png)

---

## ✨ Caractéristiques

- **Next.js 15 (App Router)** – pages statiques + quelques client components
- **Tailwind v4** avec thème inline (`globals.css`) et tokens (`--color-*`)
- **Animations ciblées** : Framer Motion **uniquement** dans le _Hero_ ; reveal CSS ailleurs
- **FX doux et opt-in** : TopLoader, scroll progress, cursor glow, splash (montés proprement)
- **Formulaire de réservation** (demo, sans backend) :
  - `react-hook-form` + validation Zod **chargée à la demande**
  - honeypot anti-bot, toasts globaux, overlay de succès
- **Sections** : Hero, Concept (image tilt), Menus (cards visuelles), Steps, Dataviz, Réserver, FAQ, Contact (embed Google Maps optionnel)
- **Pages légales** : mentions légales, CGV, politique de confidentialité
- **Accessibilité** : `SkipLink`, contrastes, `prefers-reduced-motion`
- **SEO** : Metadata, OG/Twitter image, favicon, 404 & not-found dédiées

---

## 🧭 Architecture

- `src/app/` : routes Next.js, layouts, metadata et composition de page.
- `src/features/<feature>/` : logique métier et composants liés à une feature.
- `src/shared/ui/` : primitives UI réutilisables.
- `src/shared/lib/` : utilitaires purs et hooks techniques.
- `src/content/` : contenus éditoriaux et constantes textuelles (`NAV`, menus, textes légaux).
- `src/types/` : types de domaine partagés.

### Conventions de nommage

- Composants React : `PascalCase.tsx`
- Hooks : `useXxx.ts`
- Utilitaires/fonctions : `camelCase.ts`
- Segments de routes : `kebab-case`
- Constantes de contenu : `xxx.ts` dans `src/content/`

---

## 🧰 Tooling & quality gates

- `npm run format:check` : vérifie le style avec Prettier.
- `npm run lint` : applique ESLint (ordre d'imports, imports inutilisés, `no-console` avec allowlist `warn/error` pour la démo).
- `npm run typecheck` : contrôle TypeScript strict sans émission.
- `npm run test:coverage` : exécute les tests unitaires avec un seuil de couverture.
- `npm run dev:strict` : lance le serveur de dev après vérifications format/lint/typecheck.
- `npm run check:all` : exécute l’ensemble des quality gates en local avant push.
- CI GitHub Actions : enchaîne format, lint, typecheck, tests et build puis lance un audit des dépendances (`npm audit --audit-level=high`).

---

## ⚡ Décisions performance

- **FX opt-in** : les effets visuels sont montés via un orchestrateur dédié et restent non bloquants pour le rendu principal.
- **Lazy loading ciblé** : la dataviz est chargée dynamiquement pour réduire le JS initial de la home.
- **Reduced motion** : les animations doivent respecter `prefers-reduced-motion` et proposer une expérience dégradée propre.

### Limites connues

- Les micro-FX sont volontairement visuels (projet démo) et peuvent rester coûteux sur des appareils très modestes.
- Le curseur personnalisé et certains effets sont moins pertinents sur mobile/tablette.
- Les budgets Web Vitals automatisés ne sont pas encore branchés en CI.

---

## 🔐 Environnement

- Copier `.env.example` vers `.env.local` pour configurer l’exécution locale.
- `NEXT_PUBLIC_SITE_URL` est obligatoire pour générer des URLs canoniques cohérentes (metadata, sitemap, robots).
- Utiliser une URL complète sans slash final (ex: `https://example.com`).

---

## ✨ Fonctionnalités

- **Hero visuel tendance** (image de fond, glow doré, grain animé, parallax léger)
- **Header mobile/tablette premium** (sheet, liens soulignés animés, CTA “Réserver”)
- **Sections riches**
  - Concept (visuel tilt/parallax + badges 3D)
  - Menus (cards visuelles responsives, pricing, tags, CTA)
  - Steps (timeline 1-2-3-4)
  - Dataviz _light_ (Recharts) — lazy et SSR off
  - Réserver (RHF + Zod, honeypot, toasts, overlay succès)
  - FAQ, Contact (Google Maps : fallback statique)
- **FX opt-in** : Top loader, Scroll progress, Cursor glow, Splash (logo), Orchestrateur de scroll (effets doux à partir de `lg`)
- **Pages légales** : mentions, CGV, confidentialité (cohérentes démo / sans stockage)

---
