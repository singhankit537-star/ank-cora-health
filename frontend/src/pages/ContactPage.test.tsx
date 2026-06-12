import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import ContactPage from './ContactPage'
import { clearSubmissions, getSubmissions } from '@/data/formSubmitted'

// ContactPage renders a Footer that calls useNavigate(), so it must be wrapped
// in a Router during tests.
function renderPage() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  )
}

describe('ContactPage', () => {
  beforeEach(() => {
    // Reset both the in-memory store and the persisted copy between cases so
    // submissions don't leak from one test to the next. clearSubmissions()
    // overwrites storage with an empty list; the guarded clear() wipes anything
    // else when the runtime provides a full localStorage implementation.
    clearSubmissions()
    localStorage.clear?.()
  })

  it('renders the heading and required form fields', () => {
    renderPage()

    expect(
      screen.getByRole('heading', { name: /connect with a cora representative/i }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/zip \/ postal code/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/zip \/ postal code is required/i)).toBeInTheDocument()
  })

  it('rejects a malformed email and a non-numeric zip code', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/zip \/ postal code/i), 'abc12')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument()
    expect(screen.getByText(/5- or 9-digit zip code/i)).toBeInTheDocument()
  })

  it('saves the submission, shows the thank-you popup, then resets on close', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/phone/i), '5551234567')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/zip \/ postal code/i), '45806')
    await user.type(
      screen.getByLabelText(/let us know how we can serve you/i),
      'I would like to book an appointment.',
    )
    await user.click(screen.getByRole('checkbox'))

    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Feedback popup appears.
    expect(
      await screen.findByText(/thank you for contacting us\. our team will reach you soon\./i),
    ).toBeInTheDocument()

    // Submission was persisted with a firstName + timestamp id.
    const saved = getSubmissions()
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toMatch(/^jane-\d+$/)
    expect(saved[0].email).toBe('jane@example.com')

    // Closing the popup dismisses it and resets the form for the next user.
    await user.click(screen.getByRole('button', { name: /close/i }))

    await waitFor(() => {
      expect(
        screen.queryByText(/thank you for contacting us/i),
      ).not.toBeInTheDocument()
    })

    expect(screen.getByLabelText(/first name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
