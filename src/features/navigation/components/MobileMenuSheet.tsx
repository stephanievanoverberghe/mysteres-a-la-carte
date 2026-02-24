import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, UtensilsCrossed, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { type RefObject } from 'react';
import { NAV_LINKS } from '@/content/navigation';
import Button from '@/shared/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
    active: string;
    onClose: () => void;
    dialogRef: RefObject<HTMLElement | null>;
};

export default function MobileMenuSheet({ active, onClose, dialogRef }: Props) {
    return (
        <motion.aside
            key="sheet"
            ref={dialogRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            className="lg:hidden fixed inset-x-0 top-0 z-50 origin-top rounded-b-2xl border-b border-white/10 bg-background/85 backdrop-blur supports-backdrop-filter:backdrop-blur"
            tabIndex={-1}
            initial={{ y: -28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.28, ease } }}
            exit={{ y: -20, opacity: 0, transition: { duration: 0.22, ease } }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
                if (info.offset.y > 80) onClose();
            }}
        >
            <div className="container py-4">
                <div className="flex items-center justify-between">
                    <Link href="#hero" onClick={onClose} className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Mystères à la Carte" width={150} height={36} className="h-8 w-auto" />
                    </Link>
                    <motion.button whileTap={{ scale: 0.96 }} className="p-2 rounded-xl border border-muted hover:bg-muted/20" onClick={onClose} aria-label="Fermer le menu">
                        <X />
                    </motion.button>
                </div>

                <motion.div className="mt-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
                    <p className="px-1 pb-2 text-xs uppercase tracking-wide text-muted-foreground">Explorer</p>
                    <ul className="grid gap-1">
                        {NAV_LINKS.filter((n) => n.href !== '#reserver').map((item) => (
                            <motion.li key={item.href} variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.28, ease } } }}>
                                <a
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-base transition ${active === item.href ? 'bg-primary/10 text-primary' : 'hover:bg-muted/30'}`}
                                >
                                    <span>{item.label}</span>
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <Button as="a" href="#reserver" onClick={onClose} className="w-full justify-center">
                            <UtensilsCrossed className="h-4 w-4" />
                            Réserver maintenant
                        </Button>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground text-center">Bastille, Paris • 60–90&nbsp;min • 2–6 joueurs</div>
                </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background/90 to-transparent" />
        </motion.aside>
    );
}
