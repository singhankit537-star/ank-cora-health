/**
 * Home page tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import HomePage from './Home';

describe('HomePage', () => {
  const renderPage = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders hero section with heading', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(/Your Path to Better Health/i)).toBeInTheDocument();
  });

  it('renders services section', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Physical Therapy/i)).toBeInTheDocument();
  });

  it('renders testimonials section', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(/What Our Patients Say/i)).toBeInTheDocument();
    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
  });

  it('renders call-to-action section', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(/Ready to Start Your Recovery/i)).toBeInTheDocument();
  });

  it('renders multiple buttons', () => {
    renderPage(<HomePage />);
    const buttons = screen.getAllByRole('button', { name: /appointment|schedule/i });
    expect(buttons.length).toBeGreaterThan(0);
  });
});
