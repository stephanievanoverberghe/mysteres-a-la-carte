'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
    children: React.ReactNode;
    once?: boolean;
    delay?: number;
};

export default function ScrollReveal({ children, once = true, delay = 0 }: Props) {
    return (
        <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5, ease, delay } }} viewport={{ once, margin: '-20% 0px -10% 0px' }}>
            {children}
        </motion.div>
    );
}
