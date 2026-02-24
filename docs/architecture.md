# Architecture — Mystères à la carte

Ce document formalise l’architecture cible du projet et les responsabilités de chaque couche.

## Objectifs

- Isoler la composition des routes (`app`) de la logique métier (`features`).
- Éviter les dépendances transverses entre fonctionnalités.
- Garder des primitives UI et utilitaires réellement partagés.
- Encadrer les effets visuels pour préserver les performances.

## Couches

### `src/app`

**Responsabilité :** routing Next.js (App Router), layout global, metadata, composition des pages.

- Peut importer : `features`, `shared`, `types`, `content`.
- Ne doit pas contenir de logique métier complexe.
- Doit rester un point d’orchestration.

### `src/features`

**Responsabilité :** logique métier par domaine (booking, navigation, home, not-found).

- Peut importer : `shared`, `types`, `content`.
- Ne doit pas importer `app`.
- Contient les composants et hooks spécifiques à la feature.

### `src/shared`

**Responsabilité :** briques transverses réutilisables.

- `shared/ui` : primitives et composants génériques.
- `shared/lib` : fonctions pures et hooks techniques.
- Ne dépend d’aucune feature.

### `src/services`

**Responsabilité :** accès externes, intégrations techniques (API, analytics, etc.).

- Ne dépend pas de `app` ni de composants UI.
- Fournit des interfaces consommables par les features.

> Note : le dossier `src/services` n’est pas encore exploité dans le projet actuel mais reste la destination recommandée pour les futures intégrations.

## Règles de dépendances

- `app` → `features`/`shared`/`types`/`content` ✅
- `features` → `shared`/`types`/`content` ✅
- `shared` → `features` ❌
- `features` → `app` ❌
- `services` → `app`/UI ❌

## Convention de placement

- Domaine booking : `src/features/booking`
- Domaine navigation : `src/features/navigation`
- Sections home : `src/features/home`
- UI commune : `src/shared/ui`
- Utilitaires navigateur : `src/shared/lib/browser`
- Contenu éditorial : `src/content`
- Types métier : `src/types`

## Principes d’évolution

- Toute nouvelle feature doit être créée sous `src/features/<nom-feature>`.
- Les constantes éditoriales doivent aller dans `src/content`.
- Un composant utilisé dans plusieurs features doit être déplacé vers `shared/ui`.
- Les effets visuels doivent rester optionnels et respecter `prefers-reduced-motion`.

## Sécurité et robustesse

- Les headers de sécurité HTTP sont définis au niveau racine dans `next.config.ts` pour s’appliquer à toutes les routes App Router.
- Les liens externes ouverts dans un nouvel onglet doivent utiliser `rel="noopener noreferrer"`.
- Les logs de données utilisateur côté navigateur doivent être strictement réservés au développement et protégés par un flag d’environnement explicite.
