import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'
import { saveSubmission } from '../data/formSubmitted'
import type { ContactFormValues } from '../data/formSubmitted'

// Standard, pragmatic email shape (local@domain.tld). Kept permissive enough to
// accept real-world addresses while rejecting obvious typos.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// ZIP / postal code: digits only (US 5-digit or 9-digit ZIP+4 without dash).
const ZIP_PATTERN = /^\d{4,10}$/

const defaultValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  zipCode: '',
  message: '',
  smsConsent: false,
}

export default function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ defaultValues, mode: 'onTouched' })

  const onSubmit = (data: ContactFormValues) => {
    saveSubmission(data)
    setShowThankYou(true)
  }

  // Closing the confirmation returns the form to its pristine state so the next
  // visitor starts from scratch.
  const handleCloseThankYou = () => {
    setShowThankYou(false)
    reset(defaultValues)
  }

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main" className="py-12 lg:py-16">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-cora-navy lg:text-4xl">
            Connect with a CORA Representative
          </h1>
          <p className="mt-4 text-cora-gray">
            <span className="font-semibold text-cora-blue">
              Have a question or want to schedule an appointment?
            </span>{' '}
            Complete the form below and a CORA representative will be in touch with you shortly.
            Please note that we monitor submissions Monday–Friday.
          </p>
          <p className="mt-4 text-sm text-cora-gray">
            "<span className="text-red-600">*</span>" indicates required fields
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
            {/* First + Last name */}
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="First Name" htmlFor="firstName" error={errors.firstName?.message}>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className={inputClass(!!errors.firstName)}
                  {...register('firstName', { required: 'First name is required' })}
                />
              </Field>

              <Field label="Last Name" htmlFor="lastName" error={errors.lastName?.message}>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className={inputClass(!!errors.lastName)}
                  {...register('lastName', { required: 'Last name is required' })}
                />
              </Field>
            </div>

            {/* Phone + Email + Zip */}
            <div className="grid gap-6 sm:grid-cols-3">
              <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass(!!errors.phone)}
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^[\d\s()+-]{7,}$/,
                      message: 'Enter a valid phone number',
                    },
                  })}
                />
              </Field>

              <Field label="Email" htmlFor="email" error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass(!!errors.email)}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: 'Enter a valid email address',
                    },
                  })}
                />
              </Field>

              <Field label="ZIP / Postal Code" htmlFor="zipCode" error={errors.zipCode?.message}>
                <input
                  id="zipCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className={inputClass(!!errors.zipCode)}
                  {...register('zipCode', {
                    required: 'ZIP / Postal code is required',
                    pattern: {
                      value: ZIP_PATTERN,
                      message: 'Numbers only',
                    },
                  })}
                />
              </Field>
            </div>

            {/* Message */}
            <Field
              label="Let us know how we can serve you"
              htmlFor="message"
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={5}
                className={inputClass(!!errors.message)}
                {...register('message', { required: 'Please tell us how we can help' })}
              />
            </Field>

            {/* SMS consent */}
            <div>
              <span className="block text-sm font-medium text-cora-navy">
                SMS Opt-In Consent <span className="text-red-600">*</span>
              </span>
              <label className="mt-2 flex items-start gap-2 text-sm text-cora-gray">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-cora-blue focus:ring-cora-blue/30"
                  {...register('smsConsent', { required: 'You must agree to the SMS policy' })}
                />
                <span>
                  I agree to this SMS Policy. By checking this box, you agree to receive text
                  messages from CORA Physical Therapy related to appointments, follow-ups,
                  billing, or career opportunities. Message and data rates may apply. Reply STOP
                  to opt out at any time.
                </span>
              </label>
              {errors.smsConsent && (
                <p className="mt-1 text-sm text-red-600">{errors.smsConsent.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-cora-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-cora-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit
            </button>
          </form>
        </Container>
      </main>

      <Footer />

      {showThankYou && <ThankYouModal onClose={handleCloseThankYou} />}
    </div>
  )
}

// ---- Helpers ---------------------------------------------------------------

function inputClass(hasError: boolean): string {
  return `w-full rounded-md border px-4 py-2.5 text-gray-800 shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-300/40'
      : 'border-gray-300 focus:border-cora-blue focus:ring-cora-blue/30'
  }`
}

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-cora-navy">
        {label} <span className="text-red-600">*</span>
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

interface ThankYouModalProps {
  onClose: () => void
}

function ThankYouModal({ onClose }: ThankYouModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thank-you-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 id="thank-you-title" className="mt-4 text-xl font-bold text-cora-navy">
          Thank you for Contacting us. Our team will reach you soon.
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-cora-orange px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cora-orange focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  )
}
