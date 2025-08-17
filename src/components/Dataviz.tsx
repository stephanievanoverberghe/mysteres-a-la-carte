'use client';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';

const ease = [0.22, 1, 0.36, 1] as const;

const containerV = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const blockV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/** ---- Types locaux (pas de `any`, pas de NameType/ValueType) ---- */
type DataPoint = { name: string; value: number };
type ReTooltipPayload = { value: number; name: string; color?: string };
type ReTooltipProps = { active?: boolean; payload?: ReTooltipPayload[]; label?: string | number };
type LabelContentProps = { x?: number; y?: number; width?: number; value?: number | string };

/** ---- Données (pas de `as const` pour éviter le readonly) ---- */
const DATA: DataPoint[] = [
    { name: 'Gustatif', value: 68 },
    { name: 'Visuel', value: 21 },
    { name: 'Ambiance', value: 11 },
];

/** Label au-dessus des barres */
function ValueLabel({ x = 0, y = 0, width = 0, value }: LabelContentProps) {
    const cx = Number(x) + Number(width) / 2;
    return (
        <text x={cx} y={Number(y) - 6} textAnchor="middle" fontSize={12} fill="var(--color-primary)">
            {String(value)}%
        </text>
    );
}

/** Infobulle personnalisée */
function CustomTooltip({ active, payload, label }: ReTooltipProps) {
    if (!active || !payload || payload.length === 0) return null;
    const v = Number(payload[0].value);
    return (
        <div className="rounded-xl border border-muted bg-background/90 px-3 py-2 text-sm shadow-soft">
            <div className="text-muted-foreground">{String(label)}</div>
            <div className="font-semibold text-primary">{v}%</div>
        </div>
    );
}

export default function Dataviz() {
    return (
        <section id="dataviz" aria-labelledby="dv-title" className="relative">
            <div className="container">
                <motion.div variants={containerV} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px -20% 0px' }}>
                    <motion.div variants={blockV} className="max-w-2xl">
                        <h2 id="dv-title" className="text-3xl md:text-4xl font-semibold">
                            Le saviez-vous&nbsp;?
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            Chez nos joueurs tests, les <span className="text-foreground">indices gustatifs</span> sont les plus décisifs.
                        </p>
                    </motion.div>

                    <motion.div variants={blockV} className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                    <motion.div variants={blockV} className="mt-8 rounded-2xl border border-muted bg-background/60 p-6 shadow-soft">
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA} margin={{ top: 24, right: 16, left: 8, bottom: 8 }}>
                                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        width={28}
                                        tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                                        tickFormatter={(v: number) => `${v}%`}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                                    <Bar dataKey="value" fill="var(--color-primary)" fillOpacity={0.9} stroke="var(--color-primary)" radius={[8, 8, 0, 0]}>
                                        <LabelList dataKey="value" content={<ValueLabel />} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 text-xs text-muted-foreground">Données internes issues d’ateliers tests (n ≈ 120). Échantillon indicatif.</div>
                    </motion.div>
                </motion.div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(800px_360px_at_70%_20%,var(--color-primary)_0%,transparent_60%)]"
            />
        </section>
    );
}
