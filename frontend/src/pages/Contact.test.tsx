/**
 * Contact page tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import ContactPage from './Contact';

describe('ContactPage', () => {
  const renderPage = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders contact form', () => {
    renderPage(<ContactPage />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderPage(<ContactPage />);
    expect(screen.getByText(/555.*123/i)).toBeInTheDocument();
    expect(screen.getByText(/info@corahealth.com/i)).toBeInTheDocument();
  });

  it('submits form', async () => {
    const user = userEvent.setup();
    renderPage(<ContactPage />);

    await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com');
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message');

    await user.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(screen.getByText(/Thank you for contacting us/i)).toBeInTheDocument();
  });
});
