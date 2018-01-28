import React, {Component} from 'react'
import {string} from 'prop-types'
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware, {delay} from 'redux-saga'
import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import {call, put, takeLatest} from 'redux-saga/effects'

export function getServer() {
  const req = {}
  const res = {}
  return {req, res}
}

function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_SYNC_DATA':
      return {...state, data: 'sync'}
    case 'GET_ASYNC_DATA_SUCCESS':
      return {...state, data: action.data}
    case 'RESET':
      return {}
    default:
      return state
  }
}

function* rootSaga() {
  yield takeLatest('GET_ASYNC_DATA', function*() {
    yield call(delay, 100)
    yield put({type: 'GET_ASYNC_DATA_SUCCESS', data: 'async'})
  })
}

const sagaMiddleware = createSagaMiddleware()
export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  store.runSagaTask()
  return store
}

// getInitialProps is called by Next.js at runtime.
export async function getInitialProps(WrappedComponent, context) {
  return WrappedComponent.getInitialProps(context)
}

// Snapshots the mounted component. render is called by Next.js at runtime.
export function snapshot(WrappedComponent, props) {
  const component = render(<WrappedComponent {...props} />)
  expect(toJson(component)).toMatchSnapshot()

  // Resets the store since it's being memoized during testing.
  props.store.dispatch({type: 'RESET'})
}

Simple.propTypes = {value: string}
export function Simple({value}) {
  return <div>Hello {value}!</div>
}

export class Skip extends Component {
  render() {
    return <div>Skip</div>
  }
}

export class Sync extends Component {
  static async getInitialProps({store}) {
    store.dispatch({type: 'GET_SYNC_DATA'})
    return {static: 'sync'}
  }

  render() {
    return <div>Sync</div>
  }
}

export class Async extends Component {
  static async getInitialProps({store}) {
    store.dispatch({type: 'GET_ASYNC_DATA'})
    return {static: 'async'}
  }

  render() {
    return <div>Async</div>
  }
}
