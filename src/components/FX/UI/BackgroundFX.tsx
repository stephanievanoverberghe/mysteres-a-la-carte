'use client';

export default function BackgroundFX() {
    return (
        <>
            {/* grille animée (très légère) */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* grain / bruit */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'>\
<filter id='n'>\
<feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/>\
<feColorMatrix type='saturate' values='0'/>\
</filter>\
<rect width='100%' height='100%' filter='url(%23n)' opacity='.4'/>\
</svg>\")",
                }}
            />
        </>
    );
}
