// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.js'
    },
    minify: 'terser'
  },
  mode: 'production'
});