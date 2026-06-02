/**
 * Container tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders with content', () => {
    render(<Container>Test Content</Container>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { container, rerender } = render(<Container size="sm">Content</Container>);
    let div = container.querySelector('div');
    expect(div).toHaveClass('max-w-2xl');

    rerender(<Container size="lg">Content</Container>);
    div = container.querySelector('div');
    expect(div).toHaveClass('max-w-6xl');
  });

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-class');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.querySelector('div');
    expect(div).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
  });
});
