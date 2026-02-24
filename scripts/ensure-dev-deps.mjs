#!/usr/bin/env node
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const requiredBins = ['vitest', 'playwright'];

const missing = [];
for (const bin of requiredBins) {
    const binPath = path.join(process.cwd(), 'node_modules', '.bin', bin);
    try {
        await access(binPath, constants.X_OK);
    } catch {
        missing.push(bin);
    }
}

if (missing.length > 0) {
    console.error(
        `Missing dev dependencies (${missing.join(', ')}). Run \`npm install\` (or \`npm ci\`) before running \`npm test\`.`
    );
    process.exit(1);
}
