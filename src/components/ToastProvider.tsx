'use client';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

type Variant = 'default' | 'success' | 'info' | 'warning' | 'error';

type ToastInput = {
    title: string;
    description?: string;
    variant?: Variant;
    actionLabel?: string;
    onAction?: () => void;
    duration?: number; // ms
};

type ToastItem = ToastInput & { id: string; createdAt: number };

type ToastApi = {
    show: (t: ToastInput) => string;
    success: (title: string, description?: string) => string;
    info: (title: string, description?: string) => string;
    warning: (title: string, description?: string) => string;
    error: (title: string, description?: string) => string;
};

const ToastCtx = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const remove = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback(
        (t: ToastInput) => {
            const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
            const item: ToastItem = {
                id,
                createdAt: Date.now(),
                variant: 'default',
                duration: 4200,
                ...t,
            };
            setToasts((prev) => [item, ...prev]);
            const timeout = setTimeout(() => remove(id), item.duration);
            // évite warning "setTimeout type" — on ne stocke pas
            void timeout;
            return id;
        },
        [remove]
    );

    const api: ToastApi = useMemo(
        () => ({
            show,
            success: (title, description) => show({ title, description, variant: 'success' }),
            info: (title, description) => show({ title, description, variant: 'info' }),
            warning: (title, description) => show({ title, description, variant: 'warning' }),
            error: (title, description) => show({ title, description, variant: 'error' }),
        }),
        [show]
    );

    return (
        <ToastCtx.Provider value={api}>
            {children}

            {/* Container */}
            <div
                aria-live="polite"
                aria-relevant="additions"
                className="pointer-events-none fixed bottom-4 right-4 z-[95] flex w-full max-w-sm flex-col gap-3 md:bottom-6 md:right-6"
            >
                <AnimatePresence initial={false}>
                    {toasts.map((t) => (
                        <ToastCard key={t.id} t={t} onClose={() => remove(t.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastCtx.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastCtx);
    if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
    return ctx;
}

function ToastCard({ t, onClose }: { t: ToastItem; onClose: () => void }) {
    const { title, description, variant = 'default', actionLabel, onAction } = t;

    const colors: Record<Variant, { ring: string; icon: ReactNode }> = {
        default: {
            ring: 'border-muted',
            icon: <Info className="h-5 w-5 text-muted-foreground" />,
        },
        success: {
            ring: 'border-emerald-500/50',
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
        },
        info: {
            ring: 'border-sky-500/50',
            icon: <Info className="h-5 w-5 text-sky-400" />,
        },
        warning: {
            ring: 'border-amber-500/60',
            icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
        },
        error: {
            ring: 'border-red-500/60',
            icon: <XCircle className="h-5 w-5 text-red-400" />,
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } }}
            className={`pointer-events-auto overflow-hidden rounded-2xl border bg-background/80 backdrop-blur-md shadow-soft ${colors[variant].ring}`}
            role="status"
        >
            <div className="flex items-start gap-3 p-4">
                <div className="mt-0.5 shrink-0">{colors[variant].icon}</div>
                <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">{title}</p>
                    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                    {actionLabel && onAction && (
                        <button onClick={onAction} className="mt-3 text-sm underline underline-offset-4 hover:text-primary">
                            {actionLabel}
                        </button>
                    )}
                </div>
                <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Fermer la notification">
                    <X className="h-4 w-4" />
                </button>
            </div>
            {/* liseré bas */}
            <div aria-hidden className="h-[2px] w-full bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]" />
        </motion.div>
    );
}
