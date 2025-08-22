import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';

// https://vite.dev/config/
export default defineConfig({
  base: '/solid-liquid-glass/', // CHANGE WHEN CLONING
  plugins: [
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react(),
  ],
});
