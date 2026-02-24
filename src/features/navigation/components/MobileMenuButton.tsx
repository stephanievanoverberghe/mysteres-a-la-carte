import { forwardRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
    open: boolean;
    onToggle: () => void;
};

const MobileMenuButton = forwardRef<HTMLButtonElement, Props>(function MobileMenuButton({ open, onToggle }, ref) {
    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.96 }}
            className="lg:hidden p-2 rounded-xl border border-muted hover:bg-muted/20"
            onClick={onToggle}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
        >
            {open ? <X /> : <Menu />}
        </motion.button>
    );
});

export default MobileMenuButton;
