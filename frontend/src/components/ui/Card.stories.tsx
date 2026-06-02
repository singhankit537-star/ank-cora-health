/**
 * Card Stories for Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2 className="text-xl font-bold mb-2">Card Title</h2>
        <p className="text-gray-600">This is a card with some content inside.</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h2 className="text-xl font-bold mb-2">Hoverable Card</h2>
        <p className="text-gray-600">Hover over this card to see the effect.</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-4" />
        <h2 className="text-xl font-bold mb-2">Image Card</h2>
        <p className="text-gray-600">A card with an image placeholder.</p>
      </div>
    ),
  },
};
