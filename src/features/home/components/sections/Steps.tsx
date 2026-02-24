'use client';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';
import SectionDivider from '@/shared/ui/SectionDivider';
import SectionTitle from '@/shared/ui/SectionTitle';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardV = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

type Step = { n: number; title: string; desc: string; img?: string };
const STEPS: Step[] = [
  {
    n: 1,
    title: 'Brief de table',
    desc: 'Annonce du scénario et des règles.',
    img: '/steps/brief.webp',
  },
  { n: 2, title: 'Entrée-énigme', desc: 'Premiers indices gustatifs.', img: '/steps/entree.webp' },
  {
    n: 3,
    title: 'Plat principal',
    desc: 'Pistes à recouper avec l’équipe.',
    img: '/steps/plat.webp',
  },
  {
    n: 4,
    title: 'Dessert-résolution',
    desc: 'Le twist final se savoure !',
    img: '/steps/dessert.webp',
  },
];

export default function Steps() {
  return (
    <section
      id="steps"
      aria-labelledby="steps-title"
      className="relative md:py-24 py-14 bg-muted/30"
    >
      <div className="container ">
        <div className="md:px-10 lg:px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <ScrollReveal>
                <SectionTitle id="steps-title">À quoi vous attendre</SectionTitle>
              </ScrollReveal>
              <p className="mt-3 text-muted-foreground">
                Une progression en 4 temps pour savourer l’enquête.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-muted bg-background/60 px-3 py-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" /> 60–90 min • difficulté modulable
            </div>
          </div>

          {/* ligne d’accent */}
          <SectionDivider className="mt-6" />

          {/* timeline mobile / grid desktop */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px -20% 0px' }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STEPS.map((s, i) => (
              <motion.article
                key={s.n}
                variants={cardV}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className="
                relative rounded-2xl border border-muted bg-background/60 shadow-soft overflow-hidden
                md:before:hidden
                before:absolute before:left-[1.1rem] before:top-0 before:bottom-0 before:w-px before:bg-muted/60
              "
                style={{ contentVisibility: 'auto' }}
              >
                {/* Visuel (uniquement dès md) */}
                {s.img && (
                  <div className="relative hidden md:block aspect-16/10">
                    <Image
                      src={s.img}
                      alt={`${s.title} — visuel`}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 23vw, 50vw"
                      priority={false}
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10"
                    />
                    {/* cartouche discret */}
                    <div className="absolute left-3 top-3 rounded-lg border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur">
                      Étape {s.n}
                    </div>
                  </div>
                )}

                {/* Connecteur timeline (mobile) */}
                {i === STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="md:hidden absolute left-[1.1rem] bottom-0 h-6 w-px bg-linear-to-b from-muted/60 to-transparent"
                  />
                )}

                {/* Contenu texte */}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary text-primary font-semibold">
                      {s.n}
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                </div>

                {/* liseré or discret en haut */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-6 right-6 top-0 h-0.5 bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                />
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">
              Groupes 2–6
            </span>
            <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">
              Adapté aux débutants
            </span>
            <span className="rounded-xl border border-muted bg-background/60 px-3 py-1">
              Serveurs complices
            </span>
          </div>
        </div>
      </div>

      {/* Glow discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(800px_360px_at_70%_20%,var(--color-primary)_0%,transparent_60%)]"
      />
    </section>
  );
}
