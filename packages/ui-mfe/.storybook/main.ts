import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/react-vite';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const frontendSrc = path.resolve(storybookDir, '../../../frontend/src');

const config: StorybookConfig = {
  stories: [
    '../storybook/stories/**/*.mdx',
    '../storybook/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': frontendSrc,
    };
    viteConfig.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
    return viteConfig;
  },
};

export default config;
