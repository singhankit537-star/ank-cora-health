import { useCallback, useEffect } from 'react'
import type { NewPaymentRecord } from '../services/mockApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addPaymentRequested,
  fetchPaymentsRequested,
  resetAddPaymentStatus,
} from '../store/medicalSlice'

export function usePayments() {
  const dispatch = useAppDispatch()

  // Select a primitive (the id), not the whole user object — narrower = fewer
  // re-runs of the effect below.
  const userId = useAppSelector((state) => state.auth.user?.id)

  const { payments, status, error, addPaymentStatus, addPaymentError } = useAppSelector(
    (state) => state.medical,
  )

  // Fetch on mount, and again whenever the signed-in user changes.
  useEffect(() => {
    if (userId) dispatch(fetchPaymentsRequested({ userId }))
  }, [dispatch, userId])

  // Stable action wrappers — the component just calls addBill(payment).
  const addBill = useCallback(
    (payment: NewPaymentRecord) => {
      if (!userId) return
      dispatch(addPaymentRequested({ userId, payment }))
    },
    [dispatch, userId],
  )

  const resetAdd = useCallback(() => {
    dispatch(resetAddPaymentStatus())
  }, [dispatch])

  return {
    payments,
    status, // load status: 'idle' | 'loading' | 'success' | 'error'
    error,
    addStatus: addPaymentStatus, // status of the most recent addBill()
    addError: addPaymentError,
    addBill,
    resetAdd,
  }
}
