'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
    children: React.ReactNode;
    intensity?: number; // px
    className?: string;
};

export default function Magnetic({ children, intensity = 18, className }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useTransform(mx, (v) => v * intensity);
    const y = useTransform(my, (v) => v * intensity);

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rx = (e.clientX - rect.left) / rect.width; // 0..1
        const ry = (e.clientY - rect.top) / rect.height; // 0..1
        mx.set((rx - 0.5) * 2); // -1..1
        my.set((ry - 0.5) * 2);
    };

    const handleLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x, y }}
            className={className}
            transition={{ type: 'spring', stiffness: 200, damping: 14, mass: 0.3 }}
        >
            {children}
        </motion.div>
    );
}
