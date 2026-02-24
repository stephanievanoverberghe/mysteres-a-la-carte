'use client';
import { AnimatePresence, motion } from 'framer-motion';
import DesktopNav from '@/features/navigation/components/DesktopNav';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenuButton from '@/features/navigation/components/MobileMenuButton';
import MobileMenuSheet from '@/features/navigation/components/MobileMenuSheet';
import { useHeaderNavigation } from '@/features/navigation/hooks/useHeaderNavigation';
import { useMobileMenuA11y } from '@/features/navigation/hooks/useMobileMenuA11y';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const { active, hidden, open, scrolled, setOpen } = useHeaderNavigation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useMobileMenuA11y({ open, onClose: () => setOpen(false), triggerRef, dialogRef });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${hidden ? '-translate-y-full md:-translate-y-full lg:translate-y-0' : 'translate-y-0'} ${scrolled ? 'bg-background/70 backdrop-blur supports-backdrop-filter:backdrop-blur border-b border-muted' : ''}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)] opacity-70 ${scrolled ? '' : 'opacity-0'} transition-opacity`}
      />

      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link href="#hero" className="flex items-center gap-2 hover:opacity-90 transition">
          <span className="sr-only">Mystères à la Carte — Accueil</span>
          <Image
            src="/logo.png"
            alt="Mystères à la Carte"
            width={180}
            height={40}
            className="h-8 w-auto md:h-9"
            priority
            sizes="(min-width:1024px) 180px, 140px"
          />
        </Link>

        <DesktopNav active={active} />
        <MobileMenuButton ref={triggerRef} open={open} onToggle={() => setOpen((v) => !v)} />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur supports-backdrop-filter:backdrop-blur"
              initial={{ clipPath: 'circle(0% at 92% 0%)' }}
              animate={{ clipPath: 'circle(150% at 92% 0%)', transition: { duration: 0.45, ease } }}
              exit={{ clipPath: 'circle(0% at 92% 0%)', transition: { duration: 0.3, ease } }}
              onClick={() => setOpen(false)}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(1200px_480px_at_50%_15%,var(--color-primary)_0%,transparent_60%)]"
              />
            </motion.div>

            <MobileMenuSheet active={active} onClose={() => setOpen(false)} dialogRef={dialogRef} />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
