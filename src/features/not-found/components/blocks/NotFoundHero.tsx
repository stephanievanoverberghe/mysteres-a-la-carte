import { motion } from 'framer-motion';
import SectionTitle from '@/shared/ui/SectionTitle';

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFoundHero() {
    return (
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } }} className="text-center">
            <div className="mx-auto grid grid-cols-3 gap-3 text-7xl md:text-9xl font-semibold tracking-tight">
                {['4', '0', '4'].map((ch, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.08 * i + 0.1, duration: 0.5, ease } }}
                        className="inline-block bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(180deg,var(--color-foreground),rgba(212,175,55,0.7))' }}
                    >
                        {ch}
                    </motion.span>
                ))}
            </div>
            <motion.span
                aria-hidden
                className="mx-auto mt-1 block h-[2px] w-48 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transition: { delay: 0.35, duration: 0.6, ease } }}
            />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.45, ease } }}>
                <SectionTitle id="not-found-title" className="mt-8 text-2xl md:text-3xl">
                    Oups… page introuvable
                </SectionTitle>
            </motion.div>
            <motion.p className="mt-3 text-muted-foreground" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.45, ease } }}>
                Le lien a peut-être changé. Essayez une section ci-dessous ou retournez à l’accueil.
            </motion.p>
        </motion.div>
    );
}
