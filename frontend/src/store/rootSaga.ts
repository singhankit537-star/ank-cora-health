import { all, fork } from 'redux-saga/effects'
import authSaga from './authSaga'
import medicalSaga from './medicalSaga'

export default function* rootSaga() {
  yield all([fork(authSaga), fork(medicalSaga)])
}
