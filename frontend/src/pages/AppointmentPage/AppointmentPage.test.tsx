import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentPage from './AppointmentPage'

// AppointmentPage only renders AnnouncementBar + Header beneath it, neither of
// which uses Router/Redux context, so it can be rendered directly.

describe('AppointmentPage', () => {
  it('renders the hero heading and booking-form fields', () => {
    render(<AppointmentPage />)

    expect(
      screen.getByRole('heading', { name: /get on our books/i }),
    ).toBeInTheDocument()

    // The three search inputs are exposed via aria-label.
    expect(screen.getByLabelText('Type of Therapy')).toBeInTheDocument()
    expect(screen.getByLabelText('City, State or Zip Code')).toBeInTheDocument()
    expect(screen.getByLabelText('Insurance Provider')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /search clinic now/i }),
    ).toBeInTheDocument()
  })

  it('lists the three therapy services', () => {
    render(<AppointmentPage />)

    expect(screen.getByText('Physical Therapy')).toBeInTheDocument()
    expect(screen.getByText('Occupational Therapy')).toBeInTheDocument()
    expect(screen.getByText('Speech Therapy')).toBeInTheDocument()
  })

  it('renders the care-team image with descriptive alt text', () => {
    render(<AppointmentPage />)

    expect(
      screen.getByRole('img', { name: /care team ready to support your recovery/i }),
    ).toBeInTheDocument()
  })

  it('"seen a doctor" switch starts on and toggles off then on again', async () => {
    const user = userEvent.setup()
    render(<AppointmentPage />)

    const toggle = screen.getByRole('switch')
    expect(toggle).toBeChecked() // aria-checked defaults to true

    await user.click(toggle)
    expect(toggle).not.toBeChecked()

    await user.click(toggle)
    expect(toggle).toBeChecked()
  })

  it('lets the user type into the search inputs', async () => {
    const user = userEvent.setup()
    render(<AppointmentPage />)

    const therapy = screen.getByLabelText('Type of Therapy')
    await user.type(therapy, 'Sports')
    expect(therapy).toHaveValue('Sports')
  })

  it('prevents the default full-page submit (handled client-side)', () => {
    const { container } = render(<AppointmentPage />)
    const form = container.querySelector('form')
    expect(form).not.toBeNull()

    // fireEvent.submit returns false when a handler called preventDefault().
    const notPrevented = fireEvent.submit(form as HTMLFormElement)
    expect(notPrevented).toBe(false)
  })
})
