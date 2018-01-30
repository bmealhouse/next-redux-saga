import {delay} from 'redux-saga'
import {call, put, takeEvery} from 'redux-saga/effects'

function* getAsyncReduxSagaProp() {
  yield call(delay, 2000)
  yield put({
    type: 'GET_ASYNC_REDUX_SAGA_PROP_SUCCESS',
    data: 'Asynchronous message from Redux-Saga.'
  })
}

function* rootSaga() {
  yield takeEvery('GET_ASYNC_REDUX_SAGA_PROP', getAsyncReduxSagaProp)
}

export default rootSaga
