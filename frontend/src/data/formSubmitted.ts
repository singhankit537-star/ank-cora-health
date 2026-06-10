// Persistent store for Contact-form submissions.
//
// A browser SPA cannot write to a real file on disk, so this module is the
// app-side stand-in for that "file": submissions are appended to an in-memory
// JSON array and mirrored to localStorage so they survive reloads. Each record
// is keyed by an id of the form `<firstName>-<timestamp>`.

export interface ContactSubmission {
  /** Unique id: firstName + submission timestamp, e.g. "jane-1718000000000". */
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  zipCode: string
  message: string
  smsConsent: boolean
  /** ISO-8601 timestamp of when the form was submitted. */
  submittedAt: string
}

const STORAGE_KEY = 'cora.contactSubmissions'

// Hydrate the in-memory array from localStorage once at module load.
function loadFromStorage(): ContactSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ContactSubmission[]) : []
  } catch {
    return []
  }
}

/** Every submission captured so far, newest last. */
export const formSubmissions: ContactSubmission[] = loadFromStorage()

/** The data a user actually fills in (everything except the derived fields). */
export type ContactFormValues = Omit<ContactSubmission, 'id' | 'submittedAt'>

/**
 * Append a new submission to the store and persist it. Returns the saved
 * record (including its generated id) so callers can log or display it.
 */
export function saveSubmission(values: ContactFormValues): ContactSubmission {
  const timestamp = Date.now()
  const slug = values.firstName.trim().toLowerCase().replace(/\s+/g, '-') || 'anonymous'

  const record: ContactSubmission = {
    id: `${slug}-${timestamp}`,
    ...values,
    submittedAt: new Date(timestamp).toISOString(),
  }

  formSubmissions.push(record)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formSubmissions, null, 2))
  } catch {
    // Storage may be unavailable (private mode / quota); the in-memory copy
    // still holds the submission for the current session.
  }

  return record
}
