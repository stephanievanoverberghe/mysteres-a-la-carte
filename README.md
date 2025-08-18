# Mystères à la carte

> One-page démo (portfolio) – **escape game culinaire** à Bastille (Paris).  
> Stack moderne (Next.js App Router, Tailwind v4, Framer Motion ciblé) + micro-FX, accessibilité et SEO propres.

![Open Graph](/public/og.png)

## ✨ Caractéristiques

-   **Next.js 15 (App Router)** – pages statiques + quelques client components
-   **Tailwind v4** avec thème inline (`globals.css`) et tokens (`--color-*`)
-   **Animations ciblées** : Framer Motion **uniquement** dans le _Hero_ ; reveal CSS ailleurs
-   **FX doux et opt-in** : TopLoader, scroll progress, cursor glow, splash (montés proprement)
-   **Formulaire de réservation** (demo, sans backend) :
    -   `react-hook-form` + validation Zod **chargée à la demande**
    -   honeypot anti-bot, toasts globaux, overlay de succès
-   **Sections** : Hero, Concept (image tilt), Menus (cards visuelles), Steps, Dataviz, Réserver, FAQ, Contact (embed Google Maps optionnel)
-   **Pages légales** : mentions légales, CGV, politique de confidentialité
-   **Accessibilité** : `SkipLink`, contrastes, `prefers-reduced-motion`
-   **SEO** : Metadata, OG/Twitter image, favicon, 404 & not-found dédiées

## ✨ Fonctionnalités

-   **Hero visuel tendance** (image de fond, glow doré, grain animé, parallax léger)
-   **Header mobile/tablette premium** (sheet, liens soulignés animés, CTA “Réserver”)
-   **Sections riches**
    -   Concept (visuel tilt/parallax + badges 3D)
    -   Menus (cards visuelles responsives, pricing, tags, CTA)
    -   Steps (timeline 1-2-3-4)
    -   Dataviz _light_ (Recharts) — lazy et SSR off
    -   Réserver (RHF + Zod, honeypot, toasts, overlay succès)
    -   FAQ, Contact (Google Maps : fallback statique)
-   **FX opt-in** : Top loader, Scroll progress, Cursor glow, Splash (logo), Orchestrateur de scroll (effets doux à partir de `lg`)
-   **Pages légales** : mentions, CGV, confidentialité (cohérentes démo / sans stockage)

---
