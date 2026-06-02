/**
 * SectionHeading tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('renders title', () => {
    render(<SectionHeading title="Section Title" />);
    expect(screen.getByText('Section Title')).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    render(<SectionHeading title="Title" subtitle="Subtitle text" />);
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  it('applies centered class by default', () => {
    const { container } = render(<SectionHeading title="Title" />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('text-center');
  });

  it('can be non-centered', () => {
    const { container } = render(<SectionHeading title="Title" centered={false} />);
    const div = container.querySelector('div');
    expect(div).not.toHaveClass('text-center');
  });
});
