import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as api from '../services/mockApi'
import type { MedicalRecord, PaymentRecord } from '../services/mockApi'
import {
  addRecordFailed,
  addRecordRequested,
  addRecordSucceeded,
  fetchRecordsFailed,
  fetchRecordsRequested,
  fetchRecordsSucceeded,
  fetchPaymentsFailed,
  fetchPaymentsRequested,
  fetchPaymentsSucceeded,
  addPaymentFailed,
  addPaymentRequested,
  addPaymentSucceeded,
  type AddRecordPayload,
  type FetchRecordsPayload,
  type FetchPaymentsPayload,
  type AddPaymentPayload,
} from './medicalSlice'

function* handleFetchRecords(action: PayloadAction<FetchRecordsPayload>) {
  try {
    const records: MedicalRecord[] = yield call(api.getRecords, action.payload.userId)
    yield put(fetchRecordsSucceeded(records))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not load medical history.'
    yield put(fetchRecordsFailed(message))
  }
}

function* handleFetchPayments(action: PayloadAction<FetchPaymentsPayload>) {
  try {
    const payments: api.PaymentRecord[] = yield call(api.getPayments, action.payload.userId)
    yield put(fetchPaymentsSucceeded(payments))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not load payment history.'
    yield put(fetchPaymentsFailed(message))
  }
}

function* handleAddPayment(action: PayloadAction<AddPaymentPayload>) {
  try {
    const payment: PaymentRecord = yield call(
      api.addPayment,
      action.payload.userId,
      action.payload.payment,
    )
    yield put(addPaymentSucceeded(payment))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save the bill.'
    yield put(addPaymentFailed(message))
  }
}

function* handleAddRecord(action: PayloadAction<AddRecordPayload>) {
  try {
    const record: MedicalRecord = yield call(
      api.addRecord,
      action.payload.userId,
      action.payload.record,
    )
    yield put(addRecordSucceeded(record))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save the record.'
    yield put(addRecordFailed(message))
  }
}

export default function* medicalSaga() {
  yield takeLatest(fetchRecordsRequested.type, handleFetchRecords)
  yield takeEvery(addRecordRequested.type, handleAddRecord)
  yield takeLatest(fetchPaymentsRequested.type, handleFetchPayments)
  yield takeEvery(addPaymentRequested.type, handleAddPayment)
}
