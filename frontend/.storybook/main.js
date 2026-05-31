import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'path'

const storybookDir = path.dirname(fileURLToPath(import.meta.url))

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../storybook/stories/**/*.mdx',
    '../storybook/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': path.resolve(storybookDir, '../src'),
    }
    return viteConfig
  },
}

export default config
