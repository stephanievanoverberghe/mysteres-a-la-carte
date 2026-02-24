'use client';
import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export default function LiveSpots() {
    const [spots, setSpots] = useState<number | null>(null);

    useEffect(() => {
        const hour = new Date().getHours();
        const base = [10, 9, 8, 7, 6, 5][hour % 6];
        setSpots(base);

        const id = setInterval(() => {
            setSpots((s) => {
                if (s == null) return base;
                const delta = Math.random() > 0.7 ? -1 : 0;
                return Math.min(12, Math.max(2, s + delta));
            });
        }, 10000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-muted bg-background/60 px-3 py-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span>Places restantes ce soir :</span>
            <span className="font-semibold text-primary">{spots ?? '—'}</span>
        </div>
    );
}
