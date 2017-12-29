import React, {Component} from 'react'
import {string} from 'prop-types'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware, {delay} from 'redux-saga'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from '../lib'
import {all, call, put, takeEvery} from 'redux-saga/effects'

/**
 * root-reducer.js
 */

function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_REDUX_PROP':
      return {...state, redux: action.data}
    case 'GET_REDUX_SAGA_PROP_SUCCESS':
      return {...state, reduxSaga: action.data}
    default:
      return state
  }
}

/**
 * root-saga.js
 */

function helloSaga() {
  console.log('Hello Saga!')
}

function* getReduxSagaPropSaga() {
  yield call(delay, 500)
  yield put({
    type: 'GET_REDUX_SAGA_PROP_SUCCESS',
    data: 'Hello redux-saga!'
  })
}

function* rootSaga() {
  yield all([
    call(helloSaga),
    takeEvery('GET_REDUX_SAGA_PROP', getReduxSagaPropSaga)
  ])
}

/**
 * configure-store.js
 */

const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  // NOTE: you must attach `sagaTask` to the store
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  store.runSagaTask()
  return store
}

/**
 * example.js
 */

class ExamplePage extends Component {
  static propTypes = {
    static: string,
    redux: string,
    reduxSaga: string
  }

  static async getInitialProps({store}) {
    store.dispatch({type: 'GET_REDUX_PROP', data: 'Hello redux!'})
    store.dispatch({type: 'GET_REDUX_SAGA_PROP'})
    return {static: 'Hello static!'}
  }

  render() {
    return (
      <ul>
        <li>
          prop from getInitialProps: {this.props.static}
        </li>
        <li>
          prop from redux: {this.props.redux}
        </li>
        <li>
          prop from redux-saga: {this.props.reduxSaga}
        </li>
      </ul>
    )
  }
}

export default withRedux(configureStore, state => state)(
  withReduxSaga(ExamplePage)
)
