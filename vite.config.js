import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src/',
  
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          compare: resolve(__dirname, 'src/compare/index.html'),
          saved: resolve(__dirname, 'src/saved/index.html'),
        },
      },
    },
  });