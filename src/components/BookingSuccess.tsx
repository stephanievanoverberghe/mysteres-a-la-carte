'use client';
import { motion } from 'framer-motion';

type Props = {
    open: boolean;
    onClose: () => void;
    name?: string;
    people?: number;
    date?: string;
    time?: string;
};

export default function BookingSuccess({ open, onClose, name, people, date, time }: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md rounded-2xl border border-muted bg-background p-6 shadow-soft"
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-success-title"
            >
                <h3 id="booking-success-title" className="text-xl font-semibold">
                    Demande envoyée ✅
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">Merci{name ? ` ${name}` : ''}! Nous revenons vers vous par email sous 24&nbsp;h ouvrées.</p>
                <div className="mt-4 text-sm">
                    {people !== undefined && (
                        <div>
                            <span className="text-muted-foreground">Personnes :</span> <b>{people}</b>
                        </div>
                    )}
                    {(date || time) && (
                        <div>
                            <span className="text-muted-foreground">Quand :</span>{' '}
                            <b>
                                {date} {time}
                            </b>
                        </div>
                    )}
                </div>
                <button onClick={onClose} className="btn mt-6">
                    Fermer
                </button>
            </motion.div>
        </div>
    );
}
