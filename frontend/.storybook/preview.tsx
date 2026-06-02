import '../src/index.css'
import { withReduxProvider } from '../storybook/decorators'

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [withReduxProvider],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'sky', value: '#e8f4fa' },
        { name: 'navy', value: '#0c3d6e' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
