'use client';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const sx = useSpring(x, { stiffness: 100, damping: 20, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 100, damping: 20, mass: 0.2 });

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [prefersReduced, x, y]);

  if (prefersReduced) return null;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed z-5 hidden size-100 rounded-full opacity-25 blur-3xl md:block"
      aria-hidden
    >
      <div
        className="size-full rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(212,175,55,0.28), rgba(212,175,55,0.16) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
