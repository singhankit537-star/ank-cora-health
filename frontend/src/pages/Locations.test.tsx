/**
 * Locations page tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import LocationsPage from './Locations';

describe('LocationsPage', () => {
  const renderPage = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders page heading', () => {
    renderPage(<LocationsPage />);
    expect(screen.getByText(/Find a Location/i)).toBeInTheDocument();
  });

  it('displays location information', () => {
    renderPage(<LocationsPage />);
    expect(screen.getByText(/Downtown Clinic/i)).toBeInTheDocument();
    expect(screen.getByText(/Uptown Clinic/i)).toBeInTheDocument();
  });

  it('displays clinic details', () => {
    renderPage(<LocationsPage />);
    expect(screen.getByText(/123 Main Street/i)).toBeInTheDocument();
    expect(screen.getByText(/555.*123/i)).toBeInTheDocument();
  });
});
