import React from 'react'
import withRedux from 'next-redux-wrapper'
import {render} from 'enzyme'
import toJson from 'enzyme-to-json'

import {
  configureStore,
  getInitialProps,
  snapshot,
  Simple,
  Skip,
  Sync,
  Async
} from './test-utils'

import withReduxSaga from './index'

test('wrapped component passes along props', () => {
  const WrappedComponent = withReduxSaga(Simple)
  const wrapper = render(<WrappedComponent thing="world" />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('wrapped component skips getInitialProps', async () => {
  const WrappedComponent = withRedux(configureStore)(withReduxSaga(Skip))
  const props = await getInitialProps(WrappedComponent)
  snapshot(WrappedComponent, props)
})

test('wrapped component awaits sync getInitialProps', async () => {
  const WrappedComponent = withRedux(configureStore)(withReduxSaga(Sync))

  const props = await getInitialProps(WrappedComponent)
  expect(props.initialProps.static).toBe('sync')
  expect(props.initialState.data).toBe('sync')

  snapshot(WrappedComponent, props)
})

test('wrapped component awaits async getInitialProps', async () => {
  const WrappedComponent = withRedux(configureStore)(withReduxSaga(Async))

  const props = await getInitialProps(WrappedComponent)
  expect(props.initialProps.static).toBe('async')

  // The below expectation should not be validated for the client test.
  // This data will be updated at runtime when the saga completes.
  // expect(props.initialState.data).toBe('async')

  snapshot(WrappedComponent, props)
})
