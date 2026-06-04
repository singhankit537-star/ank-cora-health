import { call, put, takeLatest } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as api from '../services/mockApi'
import type { LoginResult } from '../services/mockApi'
import {
  loginFailed,
  loginRequested,
  loginSucceeded,
  type LoginCredentials,
} from './authSlice'

function* handleLogin(action: PayloadAction<LoginCredentials>) {
  try {
    const result: LoginResult = yield call(api.login, action.payload)
    yield put(loginSucceeded(result))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
    yield put(loginFailed(message))
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequested.type, handleLogin)
}
