type SectionDividerProps = {
    className?: string;
};

export default function SectionDivider({ className }: SectionDividerProps) {
    return <div className={['mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]', className].filter(Boolean).join(' ')} />;
}
