import {delay, put, takeEvery} from 'redux-saga/effects'

import {
  GET_ASYNC_REDUX_SAGA_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE_SUCCESS,
  ASYNC_REDUX_SAGA_PROP_TEXT,
} from '../constants'

const TEST = process.env.NODE_ENV === 'test'

function* getAsyncReduxSagaProp() {
  yield delay(TEST ? 100 : 2000)

  yield put({
    type: GET_ASYNC_REDUX_SAGA_PROP_TYPE_SUCCESS,
    data: ASYNC_REDUX_SAGA_PROP_TEXT,
  })
}

function* rootSaga() {
  yield takeEvery(GET_ASYNC_REDUX_SAGA_PROP_TYPE, getAsyncReduxSagaProp)
}

export default rootSaga
