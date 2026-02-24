import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const FX_COMPONENTS = [
    'src/shared/ui/fx/TopLoader.tsx',
    'src/shared/ui/fx/CursorGlow.tsx',
    'src/shared/ui/fx/Splash.tsx',
    'src/shared/ui/fx/ScrollProgress.tsx',
];

const SOURCE_BUDGET_BYTES = 9_000;
const GZIP_BUDGET_BYTES = 3_000;

let failed = false;

console.log('FX size check (source + gzip)');
for (const file of FX_COMPONENTS) {
    const source = await readFile(file, 'utf8');
    const sourceBytes = Buffer.byteLength(source, 'utf8');
    const gzipBytes = gzipSync(source).byteLength;

    const sourceOk = sourceBytes <= SOURCE_BUDGET_BYTES;
    const gzipOk = gzipBytes <= GZIP_BUDGET_BYTES;

    if (!sourceOk || !gzipOk) failed = true;

    const marker = sourceOk && gzipOk ? '✅' : '❌';
    console.log(
        `${marker} ${file} -> source=${sourceBytes}B (max ${SOURCE_BUDGET_BYTES}B), gzip=${gzipBytes}B (max ${GZIP_BUDGET_BYTES}B)`,
    );
}

if (failed) {
    console.error('\nAt least one FX component exceeds size budgets.');
    process.exit(1);
}
