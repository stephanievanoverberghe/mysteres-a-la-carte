import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import './src/scss/index.scss';`,
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
