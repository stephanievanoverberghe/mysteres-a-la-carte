'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

type Params = {
    open: boolean;
    onClose: () => void;
    triggerRef: RefObject<HTMLButtonElement | null>;
    dialogRef: RefObject<HTMLElement | null>;
};

export function useMobileMenuA11y({ open, onClose, triggerRef, dialogRef }: Params) {
    useEffect(() => {
        if (!open) return;

        const dialog = dialogRef.current;
        if (!dialog) return;

        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current;
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        const firstFocusable = focusable[0] ?? dialog;
        const lastFocusable = focusable[focusable.length - 1] ?? dialog;

        firstFocusable.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab') return;

            const activeElement = document.activeElement;
            if (event.shiftKey) {
                if (activeElement === firstFocusable || activeElement === dialog) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
                return;
            }

            if (activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        };

        dialog.addEventListener('keydown', onKeyDown);

        return () => {
            dialog.removeEventListener('keydown', onKeyDown);
            previouslyFocused?.focus();
        };
    }, [dialogRef, onClose, open, triggerRef]);
}
