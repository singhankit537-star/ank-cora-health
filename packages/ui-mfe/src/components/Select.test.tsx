/**
 * Select tests
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  it('renders select with options', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Choose" options={options} />);
    expect(screen.getByLabelText('Choose')).toBeInTheDocument();
  });

  it('shows placeholder', () => {
    render(<Select placeholder="Select an option" options={options} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Select error="This field is required" options={options} />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('allows selection', async () => {
    const user = userEvent.setup();
    render(<Select options={options} data-testid="test-select" />);
    const select = screen.getByTestId('test-select') as HTMLSelectElement;
    await user.selectOptions(select, 'option2');
    expect((select as HTMLSelectElement).value).toBe('option2');
  });
});
