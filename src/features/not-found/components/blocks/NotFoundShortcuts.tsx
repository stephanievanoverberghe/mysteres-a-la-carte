import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Link2 } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

type Item = { label: string; href: string; emoji?: string };

type Props = { results: Item[] };

export default function NotFoundShortcuts({ results }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.45, ease } }}
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
      role="listbox"
      aria-label="Raccourcis vers les sections"
    >
      <AnimatePresence initial={false}>
        {results.map((item) => (
          <motion.div
            key={item.href}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease } }}
          >
            <Link
              href={item.href}
              className="group block rounded-2xl border border-muted bg-background/60 px-4 py-3 shadow-soft hover:border-primary/70 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
