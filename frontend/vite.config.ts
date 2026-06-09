import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const uiMfeRemote = env.VITE_UI_MFE_REMOTE;

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(uiMfeRemote
        ? [
            federation({
              name: 'coraHost',
              remotes: {
                uiMfe: {
                  type: 'module',
                  name: 'uiMfe',
                  entry: uiMfeRemote,
                  entryGlobalName: 'uiMfe',
                  shareScope: 'default',
                },
              },
              shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
              },
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@services': path.resolve(__dirname, './src/services'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
        '@hocs': path.resolve(__dirname, './src/hocs'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: uiMfeRemote ? 'chrome89' : undefined,
    },
  };
});
