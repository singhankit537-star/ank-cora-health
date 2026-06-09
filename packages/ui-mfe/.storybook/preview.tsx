import type { Preview } from '@storybook/react';
import '@ank-cora/ui-mfe/theme.css';
import '../../../frontend/src/index.css';
import { withReduxProvider } from '../storybook/decorators';

const preview: Preview = {
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
  },
  tags: ['autodocs'],
};

export default preview;
