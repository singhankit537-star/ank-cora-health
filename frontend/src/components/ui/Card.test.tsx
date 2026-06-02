/**
 * Card tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders card with content', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies shadow classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('shadow-md');
  });

  it('applies hoverable classes when enabled', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('hover:shadow-lg', 'cursor-pointer');
  });

  it('renders complex children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector('div');
    expect(card).toHaveClass('custom-class');
  });
});
