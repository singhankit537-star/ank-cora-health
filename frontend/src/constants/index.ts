// Common app-wide constants. Import from any page/component via:
//   import { ROUTES, PAYMENT_METHODS } from '@/constants'
import type { PaymentRecord } from '@/services/mockApi'

// --- Brand ----------------------------------------------------------------

export const APP_NAME = 'CORA Physical Therapy'

// cora-navy as an RGB tuple — used where a hex/Tailwind class can't be (e.g.
// jsPDF's setTextColor / fillColor).
export const CORA_NAVY_RGB: [number, number, number] = [12, 61, 110]

// --- Routes ---------------------------------------------------------------

// Single source of truth for navigation paths. Use these instead of inline
// string literals so a path change happens in one place.
export const ROUTES = {
  home: '/',
  therapies: '/therapies',
  appointment: '/appointment',
  locations: '/locations',
  leadership: '/leadership',
  login: '/login',
  contact: '/contact',
  dashboard: '/dashboard',
  paymentHistory: '/payment-history',
} as const

// --- Payments -------------------------------------------------------------

export const PAYMENT_METHODS = [
  'Credit Card',
  'Debit Card',
  'Insurance',
  'Cash',
  'Bank Transfer',
] as const

export const PAYMENT_STATUSES: PaymentRecord['status'][] = ['Pending', 'Paid', 'Failed']

// Default currency formatter shared across pages.
export const CURRENCY_CODE = 'INR'

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: CURRENCY_CODE,
})
