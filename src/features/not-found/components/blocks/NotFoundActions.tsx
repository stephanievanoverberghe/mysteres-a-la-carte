import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Copy, Bug, Home } from 'lucide-react';
import Magnetic from '@/shared/ui/fx/Magnetic';
import { buttonClassName } from '@/shared/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
    onGoBack: () => void;
    onCopyUrl: () => void;
    onReportUrl: () => void;
};

export default function NotFoundActions({ onGoBack, onCopyUrl, onReportUrl }: Props) {
    return (
        <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.45, ease } }}
        >
            <Magnetic>
                <Link href="/" className={buttonClassName('primary', 'inline-flex items-center gap-2')}>
                    <Home className="h-4 w-4" />
                    Accueil
                </Link>
            </Magnetic>
            <Magnetic>
                <Link href="/#reserver" className={buttonClassName('primary', 'inline-flex items-center gap-2')}>
                    <Compass className="h-4 w-4" />
                    Réserver
                </Link>
            </Magnetic>
            <button onClick={onGoBack} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Page précédente
            </button>
            <button onClick={onCopyUrl} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                <Copy className="h-4 w-4" />
                Copier l’URL
            </button>
            <button onClick={onReportUrl} className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-primary">
                <Bug className="h-4 w-4" />
                Signaler ce lien
            </button>
        </motion.div>
    );
}
