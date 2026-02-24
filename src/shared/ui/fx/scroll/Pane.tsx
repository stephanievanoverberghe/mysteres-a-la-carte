'use client';
import type { CSSProperties, ElementType, ReactNode } from 'react';

/**
 * Pane applique une translation/rotation/scale très légère
 * en fonction de --fx-speed (0..1) et --fx-dir (-1..1).
 * Sur < lg, ces variables valent 0 → aucun effet.
 */
type Props = {
    children: ReactNode;
    translate?: number;
    rotate?: number;
    scale?: number;
    className?: string;
    as?: ElementType;
};

export default function Pane({ children, translate = 14, rotate = 0.35, scale = 0.015, className = '', as }: Props) {
    const t = `translateY(calc(var(--fx-speed,0) * var(--fx-dir,0) * ${translate}px))`;
    const r = `rotate(calc(var(--fx-speed,0) * var(--fx-dir,0) * ${rotate}deg))`;
    const s = `scale(calc(1 + (var(--fx-speed,0) * ${scale})))`;

    const Component: ElementType = as ?? 'div';

    const style: CSSProperties = {
        willChange: 'transform',
        transform: `${t} ${r} ${s}`,
        transition: 'transform 120ms cubic-bezier(0.22,1,0.36,1)',
    };

    return (
        <Component className={className} style={style}>
            {children}
        </Component>
    );
}
