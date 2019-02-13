import withRedux from 'next-redux-wrapper'
import withReduxSaga from '..'
import ClassComponent from './components/class-component'
import FunctionalComponent from './components/functional-component'
import AsyncGetInitialProps from './components/async-get-initial-props'
import SyncGetInitialProps from './components/sync-get-initial-props'
import configureStore from './store/configure-store'
import createSnapshot from './utils/create-snapshot'
import getInitialProps from './utils/get-initial-props'
import {STATIC_PROP_TEXT, SYNC_REDUX_PROP_TEXT} from './constants'

test('Wrapped component passes along React props', () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(FunctionalComponent),
  )

  createSnapshot(WrappedComponent)
})

test('Wrapped component skips getInitialProps when it does not exist', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(ClassComponent),
  )

  const props = await getInitialProps(WrappedComponent)
  expect(props.isServer).toBeFalsy()

  createSnapshot(WrappedComponent, props)
})

test('Wrapped component awaits synchronous getInitialProps', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(SyncGetInitialProps),
  )

  const props = await getInitialProps(WrappedComponent)

  expect(props.isServer).toBeFalsy()
  expect(props.initialState).toEqual({syncReduxProp: SYNC_REDUX_PROP_TEXT})
  expect(props.initialProps).toEqual({staticProp: STATIC_PROP_TEXT})

  createSnapshot(WrappedComponent, props)
})

test('Wrapped component awaits asynchronous getInitialProps', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(AsyncGetInitialProps),
  )

  const props = await getInitialProps(WrappedComponent)

  expect(props.isServer).toBeFalsy()
  expect(props.initialState).toEqual({syncReduxProp: SYNC_REDUX_PROP_TEXT})
  expect(props.initialProps).toEqual({staticProp: STATIC_PROP_TEXT})

  createSnapshot(WrappedComponent, props)
})
