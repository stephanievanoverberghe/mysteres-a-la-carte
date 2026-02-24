import type { ReactNode } from 'react';

type SectionTitleProps = {
    id: string;
    children: ReactNode;
    className?: string;
};

export default function SectionTitle({ id, children, className }: SectionTitleProps) {
    return (
        <h2 id={id} className={['text-3xl md:text-4xl font-semibold', className].filter(Boolean).join(' ')}>
            {children}
        </h2>
    );
}
