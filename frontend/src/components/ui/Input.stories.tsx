/**
 * Input Stories for Storybook
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'example@email.com',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    placeholder: 'example@email.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    placeholder: 'Enter password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit',
  },
};
