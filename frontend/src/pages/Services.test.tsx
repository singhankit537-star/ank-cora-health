/**
 * Services page tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ServicesPage from './Services';

describe('ServicesPage', () => {
  const renderPage = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders page heading', () => {
    renderPage(<ServicesPage />);
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
  });

  it('renders all services', () => {
    renderPage(<ServicesPage />);
    expect(screen.getByText(/Physical Therapy/i)).toBeInTheDocument();
    expect(screen.getByText(/Sports Medicine/i)).toBeInTheDocument();
    expect(screen.getByText(/Wellness Programs/i)).toBeInTheDocument();
  });

  it('displays benefits for each service', () => {
    renderPage(<ServicesPage />);
    expect(screen.getByText(/Pain relief/i)).toBeInTheDocument();
    expect(screen.getByText(/Injury prevention/i)).toBeInTheDocument();
  });
});
