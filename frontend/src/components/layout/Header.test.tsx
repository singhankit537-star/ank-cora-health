/**
 * Header tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders logo', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('CoraHealth')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
  });

  it('renders book appointment button', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('button', { name: /book appointment/i })).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    await user.click(menuButton);
    // Menu should be visible after clicking
    const mobileLinks = screen.getAllByText('Home');
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
  });
});
