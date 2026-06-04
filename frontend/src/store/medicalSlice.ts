import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  MedicalRecord,
  NewMedicalRecord,
  NewPaymentRecord,
  PaymentRecord,
} from '../services/mockApi'

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error'

export interface MedicalState {
  records: MedicalRecord[],
  payments: PaymentRecord[],
  status: LoadStatus
  error: string | null
  addStatus: LoadStatus
  addError: string | null
  addPaymentStatus: LoadStatus
  addPaymentError: string | null
}

const initialState: MedicalState = {
  records: [],
  payments: [],
  status: 'idle',
  error: null,
  addStatus: 'idle',
  addError: null,
  addPaymentStatus: 'idle',
  addPaymentError: null,
}

// Saga trigger payloads carry the acting user's id so the mock API can scope data.
export interface FetchRecordsPayload {
  userId: string
}
export interface AddRecordPayload {
  userId: string
  record: NewMedicalRecord
}
export interface FetchPaymentsPayload {
  userId: string
}
export interface AddPaymentPayload {
  userId: string
  payment: NewPaymentRecord
}

const medicalSlice = createSlice({
  name: 'medical',
  initialState,
  reducers: {
    fetchRecordsRequested(state, _action: PayloadAction<FetchRecordsPayload>) {
      state.status = 'loading'
      state.error = null
    },
    fetchRecordsSucceeded(state, action: PayloadAction<MedicalRecord[]>) {
      state.records = action.payload
      state.status = 'success'
    },
    fetchRecordsFailed(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    addRecordRequested(state, _action: PayloadAction<AddRecordPayload>) {
      state.addStatus = 'loading'
      state.addError = null
    },
    addRecordSucceeded(state, action: PayloadAction<MedicalRecord>) {
      state.addStatus = 'success'
      // Keep newest first to match getRecords ordering.
      state.records.unshift(action.payload)
    },
    addRecordFailed(state, action: PayloadAction<string>) {
      state.addStatus = 'error'
      state.addError = action.payload
    },
    resetAddStatus(state) {
      state.addStatus = 'idle'
      state.addError = null
    },
    fetchPaymentsRequested(state, _action: PayloadAction<FetchPaymentsPayload>) {
      state.status = 'loading'
      state.error = null
    },
    fetchPaymentsSucceeded(state, action: PayloadAction<PaymentRecord[]>) {
      state.payments = action.payload
      state.status = 'success'
    },
    fetchPaymentsFailed(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    addPaymentRequested(state, _action: PayloadAction<AddPaymentPayload>) {
      state.addPaymentStatus = 'loading'
      state.addPaymentError = null
    },
    addPaymentSucceeded(state, action: PayloadAction<PaymentRecord>) {
      state.addPaymentStatus = 'success'
      // Keep newest first to match getPayments ordering.
      state.payments.unshift(action.payload)
    },
    addPaymentFailed(state, action: PayloadAction<string>) {
      state.addPaymentStatus = 'error'
      state.addPaymentError = action.payload
    },
    resetAddPaymentStatus(state) {
      state.addPaymentStatus = 'idle'
      state.addPaymentError = null
    },
  },
})

export const {
  fetchRecordsRequested,
  fetchRecordsSucceeded,
  fetchRecordsFailed,
  addRecordRequested,
  addRecordSucceeded,
  addRecordFailed,
  resetAddStatus,
  fetchPaymentsRequested,
  fetchPaymentsSucceeded,
  fetchPaymentsFailed,
  addPaymentRequested,
  addPaymentSucceeded,
  addPaymentFailed,
  resetAddPaymentStatus,
} = medicalSlice.actions
export default medicalSlice.reducer
