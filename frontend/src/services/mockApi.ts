// Mock backend for the demo patient portal. Everything lives in module scope so
// data persists for the lifetime of the page (resets on full reload). Swap these
// functions for real `fetch` calls when a backend exists — the shapes match what
// the sagas expect.

export interface User {
  id: string
  name: string
  email: string
  dateOfBirth: string
  bloodType: string
  primaryProvider: string
}

export type RecordStatus = 'Active' | 'Ongoing' | 'Resolved' | 'Scheduled'

export interface MedicalRecord {
  id: string
  date: string // ISO date (yyyy-mm-dd)
  type: string // e.g. "Physical Therapy", "Diagnosis", "Medication"
  condition: string
  provider: string
  status: RecordStatus
  notes: string
}
export interface PaymentRecord {
  id: string
  date: string // ISO date (yyyy-mm-dd)
  amount: number
  method: string // e.g. "Credit Card", "Insurance", "Cash"
  status: 'Paid' | 'Pending' | 'Failed'
  description: string
}

// New records arrive without server-assigned fields.
export type NewMedicalRecord = Omit<MedicalRecord, 'id' | 'date'> &
  Partial<Pick<MedicalRecord, 'date'>>

// New bills/payments arrive without server-assigned fields.
export type NewPaymentRecord = Omit<PaymentRecord, 'id' | 'date'> &
  Partial<Pick<PaymentRecord, 'date'>>

interface Credentials {
  email: string
  password: string
}

// A purchasable therapy plan shown on the public "Available Therapy List" page.
export interface TherapyPlan {
  id: string
  name: string // therapy plan name (maps to a bill's description)
  type: string // therapy type, e.g. "Physical Therapy"
  amount: number // price in USD (maps to a bill's amount)
  days: number // number of therapy days the plan covers
}

// --- Seed data -------------------------------------------------------------

interface DemoAccount {
  user: User
  password: string
  records: MedicalRecord[]
  payments: PaymentRecord[]
}

// Public catalogue of therapy plans — no auth required to browse.
const therapyPlans: TherapyPlan[] = [
  { id: 't-pt-starter', name: 'Physical Therapy — Starter', type: 'Physical Therapy', amount: 150, days: 5 },
  { id: 't-pt-recovery', name: 'Physical Therapy — Recovery', type: 'Physical Therapy', amount: 420, days: 15 },
  { id: 't-pt-complete', name: 'Physical Therapy — Complete', type: 'Physical Therapy', amount: 780, days: 30 },
  { id: 't-ot-essentials', name: 'Occupational Therapy — Essentials', type: 'Occupational Therapy', amount: 360, days: 12 },
  { id: 't-pelvic-health', name: 'Pelvic Health Program', type: 'Pelvic Health', amount: 540, days: 18 },
  { id: 't-sports-peak', name: 'Sports Performance — Peak', type: 'Sports Performance', amount: 660, days: 20 },
  { id: 't-manual-relief', name: 'Manual Therapy — Relief', type: 'Manual Therapy', amount: 240, days: 8 },
  { id: 't-dry-needling', name: 'Dry Needling Package', type: 'Dry Needling', amount: 200, days: 6 },
]

const accounts: Record<string, DemoAccount> = {
  'jane.doe@demo.com': {
    password: 'password123',
    user: {
      id: 'u-jane',
      name: 'Jane Doe',
      email: 'jane.doe@demo.com',
      dateOfBirth: '1989-04-12',
      bloodType: 'O+',
      primaryProvider: 'Dr. Amara Okafor, DPT',
    },
    records: [
      {
        id: 'r-j1',
        date: '2025-11-02',
        type: 'Physical Therapy',
        condition: 'Lower back pain (lumbar strain)',
        provider: 'Dr. Amara Okafor, DPT',
        status: 'Ongoing',
        notes: 'Weekly sessions focused on core stabilization. Good progress.',
      },
      {
        id: 'r-j2',
        date: '2025-08-19',
        type: 'Diagnosis',
        condition: 'Mild scoliosis',
        provider: 'Dr. Priya Nair, PT',
        status: 'Active',
        notes: 'Monitoring curvature; posture exercises prescribed.',
      },
      {
        id: 'r-j3',
        date: '2025-03-05',
        type: 'Injury',
        condition: 'Right ankle sprain',
        provider: 'Marcus Delgado',
        status: 'Resolved',
        notes: 'Full recovery after 6 weeks of rehab.',
      },
    ],
    payments: [
      {
        id: 'p-j1',
        date: '2025-11-15',
        amount: 150.0,
        method: 'Credit Card',
        status: 'Paid',
        description: 'Physical therapy session - Nov 10, 2025',
      },
      {
        id: 'p-j2',
        date: '2025-10-01',
        amount: 200.0,
        method: 'Credit Card',
        status: 'Paid',
        description: 'Physical therapy session - Oct 27, 2025',
      },
    ],
  },
  'john.smith@demo.com': {
    password: 'password123',
    user: {
      id: 'u-john',
      name: 'John Smith',
      email: 'john.smith@demo.com',
      dateOfBirth: '1976-09-30',
      bloodType: 'A-',
      primaryProvider: 'Dr. Priya Nair, PT',
    },
    records: [
      {
        id: 'r-s1',
        date: '2025-12-10',
        type: 'Physical Therapy',
        condition: 'Rotator cuff tendinitis (left shoulder)',
        provider: 'Dr. Priya Nair, PT',
        status: 'Ongoing',
        notes: 'Range-of-motion improving. Continue resistance band work.',
      },
      {
        id: 'r-s2',
        date: '2025-06-22',
        type: 'Medication',
        condition: 'Hypertension',
        provider: 'Dr. Amara Okafor, DPT',
        status: 'Active',
        notes: 'Lisinopril 10mg daily. BP well controlled.',
      },
    ],
    payments: [
      {
        id: 'p-s1',
        date: '2025-12-10',
        amount: 150.0,
        method: 'Credit Card',
        status: 'Paid',
        description: 'Physical therapy session - Dec 10, 2025',
      },
    ],
  },
}

// --- Helpers ---------------------------------------------------------------

const LATENCY_MS = 600

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS))
}

function reject(message: string): Promise<never> {
  return new Promise((_, rej) => setTimeout(() => rej(new Error(message)), LATENCY_MS))
}

let recordCounter = 0
function nextId(): string {
  recordCounter += 1
  return `r-new-${recordCounter}-${Date.now()}`
}

function findAccountById(userId: string): DemoAccount | undefined {
  return Object.values(accounts).find((a) => a.user.id === userId)
}

// --- "API" -----------------------------------------------------------------

export interface LoginResult {
  user: User
  token: string
}

export function login({ email, password }: Credentials): Promise<LoginResult> {
  const account = accounts[email.trim().toLowerCase()]
  if (!account || account.password !== password) {
    return reject('Invalid email or password. Try a demo account below.')
  }
  return delay({ user: account.user, token: `demo-token-${account.user.id}` })
}

// Public — anyone can browse the therapy catalogue.
export function getTherapies(): Promise<TherapyPlan[]> {
  return delay([...therapyPlans])
}

export function getRecords(userId: string): Promise<MedicalRecord[]> {
  const account = findAccountById(userId)
  if (!account) return reject('User not found.')
  // Newest first.
  return delay([...account.records].sort((a, b) => b.date.localeCompare(a.date)))
}

export function getPayments(userId: string): Promise<PaymentRecord[]> {
  const account = findAccountById(userId)
  if (!account) return reject('User not found.')
  // Newest first.
  return delay([...account.payments].sort((a, b) => b.date.localeCompare(a.date)))
}

export function addRecord(
  userId: string,
  input: NewMedicalRecord,
): Promise<MedicalRecord> {
  const account = findAccountById(userId)
  if (!account) return reject('User not found.')
  const record: MedicalRecord = {
    id: nextId(),
    date: input.date ?? new Date().toISOString().slice(0, 10),
    type: input.type,
    condition: input.condition,
    provider: input.provider,
    status: input.status,
    notes: input.notes,
  }
  account.records.push(record)
  return delay(record)
}

export function addPayment(
  userId: string,
  input: NewPaymentRecord,
): Promise<PaymentRecord> {
  const account = findAccountById(userId)
  if (!account) return reject('User not found.')
  const payment: PaymentRecord = {
    id: nextId(),
    date: input.date ?? new Date().toISOString().slice(0, 10),
    amount: input.amount,
    method: input.method,
    status: input.status,
    description: input.description,
  }
  account.payments.push(payment)
  return delay(payment)
}
