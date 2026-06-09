import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import path from 'path';
import { defineConfig } from 'vite';

const port = 5001;
const origin = `http://localhost:${port}`;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'uiMfe',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/index.ts',
        './theme.css': './src/theme.css',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port,
    origin,
    cors: true,
  },
  preview: {
    port,
    cors: true,
  },
  build: {
    target: 'chrome89',
    outDir: 'dist-federation',
    emptyOutDir: true,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.federation.html'),
    },
  },
});
