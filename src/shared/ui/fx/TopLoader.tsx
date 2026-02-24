'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderInner />
    </Suspense>
  );
}

function TopLoaderInner() {
  const pathname = usePathname();
  const search = useSearchParams();
  const searchString = useMemo(() => search?.toString() ?? '', [search]);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    setVisible(true);
    setProgress(0.1);

    const t1 = setTimeout(() => mounted && setProgress(0.6), 90);
    const t2 = setTimeout(() => mounted && setProgress(0.85), 420);
    const t3 = setTimeout(() => {
      if (!mounted) return;
      setProgress(1);
      setTimeout(() => {
        if (!mounted) return;
        setVisible(false);
        setProgress(0);
      }, 260);
    }, 720);

    return () => {
      mounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, searchString]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-90 h-0.75 w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(90deg,var(--color-primary),rgba(212,175,55,0.6))' }}
        aria-hidden
      />
      <div
        aria-hidden
        className="fixed left-0 top-0 z-89 h-8 w-full bg-[radial-gradient(50%_6px_at_50%_0,rgba(212,175,55,0.5),transparent)] pointer-events-none"
      />
    </>
  );
}
