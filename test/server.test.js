/** @jest-environment node */
import React from 'react'
import withRedux from 'next-redux-wrapper'
import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import withReduxSaga from '..'
import AsyncGetInitialProps from './components/async-get-initial-props'
import ClassComponent from './components/class-component'
import FunctionalComponent from './components/functional-component'
import SyncGetInitialProps from './components/sync-get-initial-props'
import configureStore from './store/configure-store'
import createSnapshot from './utils/create-snapshot'
import getInitialProps from './utils/get-initial-props'
import getServerContext from './utils/get-server-context'

test('Wrapped component passes along React props (sync)', () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(FunctionalComponent)
  )

  const wrapper = render(<WrappedComponent mode="sync" />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('Wrapped component skips getInitialProps when it does not exist (sync)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(ClassComponent)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'sync', ...props})
})

test('Wrapped component awaits synchronous getInitialProps (sync)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(SyncGetInitialProps)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'sync', ...props})
})

test('Wrapped component awaits asynchronous getInitialProps (sync)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga(AsyncGetInitialProps)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'sync', ...props})
})

test('Wrapped component passes along React props (async)', () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga({async: true})(FunctionalComponent)
  )

  const wrapper = render(<WrappedComponent mode="async" />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

test('Wrapped component skips getInitialProps when it does not exist (async)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga({async: true})(ClassComponent)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'async', ...props})
})

test('Wrapped component awaits synchronous getInitialProps (async)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga({async: true})(SyncGetInitialProps)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'async', ...props})
})

test('Wrapped component awaits asynchronous getInitialProps (async)', async () => {
  const WrappedComponent = withRedux(configureStore)(
    withReduxSaga({async: true})(AsyncGetInitialProps)
  )

  const props = await getInitialProps(WrappedComponent, getServerContext())
  createSnapshot(WrappedComponent, {mode: 'async', ...props})
})
