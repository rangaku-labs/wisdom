import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/wisdom/', // Your GitHub Pages repository name
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
