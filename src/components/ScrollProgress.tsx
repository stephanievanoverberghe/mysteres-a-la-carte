'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
            <motion.div style={{ scaleX, transformOrigin: '0% 50%' }} className="h-full bg-primary" />
        </div>
    );
}
