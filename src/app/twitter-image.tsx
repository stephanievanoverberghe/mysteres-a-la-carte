import { ImageResponse } from 'next/og';

export const runtime = 'edge'; // ← défini ici, pas ré-exporté
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    background: 'linear-gradient(135deg,#0a0a0a,#1a1a1a)',
                    color: 'white',
                    position: 'relative',
                    fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial',
                }}
            >
                {/* halo */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(800px 320px at 30% 25%, rgba(212,175,55,0.5), transparent 60%)',
                        opacity: 0.5,
                    }}
                />
                <div style={{ margin: '64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ fontSize: 60, fontWeight: 700 }}>Mystères à la carte</div>
                    <div style={{ fontSize: 28, opacity: 0.9 }}>
                        Résolvez l’énigme. <span style={{ color: '#D4AF37' }}>Dégustez</span> la solution.
                    </div>
                    <div style={{ marginTop: 8, fontSize: 20, opacity: 0.7 }}>Escape game culinaire • Bastille, Paris</div>
                </div>
            </div>
        ),
        { ...size }
    );
}
