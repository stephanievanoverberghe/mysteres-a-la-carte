import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { q: string; onChange: (_value: string) => void };

export default function NotFoundSearch({ q, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.45, ease } }}
      className="mt-10"
    >
      <label htmlFor="nfq" className="sr-only">
        Rechercher une section
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          id="nfq"
          value={q}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher une section (ex. Réserver, FAQ…) "
          className="w-full rounded-2xl border border-muted bg-background/60 pl-11 pr-4 py-3"
          autoComplete="off"
          autoFocus
        />
      </div>
    </motion.div>
  );
}
