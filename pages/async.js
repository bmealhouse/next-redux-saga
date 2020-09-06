import React, {Component} from 'react'

import {string} from 'prop-types'

import {connect} from 'react-redux'

import withReduxSaga from '..'

import Layout from '../components/layout'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT,
} from '../test/constants'

class AsyncExample extends Component {
  static propTypes = {
    staticProp: string,
    syncReduxProp: string,
    asyncReduxSagaProp: string,
  }

  static getInitialProps({ctx: {store}}) {
    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT,
    })

    store.dispatch({type: GET_ASYNC_REDUX_SAGA_PROP_TYPE})
    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    const {staticProp, syncReduxProp, asyncReduxSagaProp} = this.props

    return (
      <Layout>
        <section>
          Received <strong>static</strong> prop:
          <pre>
            <code>{staticProp}</code>
          </pre>
        </section>
        <section>
          Received <strong>synchronous</strong> Redux prop:
          <pre>
            <code>{syncReduxProp}</code>
          </pre>
        </section>
        <section>
          Received <strong>asynchronous</strong> Redux-Saga prop:
          <pre>
            <code>{asyncReduxSagaProp || 'loading...'}</code>
          </pre>
        </section>
      </Layout>
    )
  }
}

export default withReduxSaga(connect(state => state)(AsyncExample))
