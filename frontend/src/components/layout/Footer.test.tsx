/**
 * Footer tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Footer } from './Footer';

describe('Footer', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders company name', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('CoraHealth')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('displays services', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Physical Therapy')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/555.*123/)).toBeInTheDocument();
  });

  it('displays copyright year', () => {
    renderWithRouter(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
