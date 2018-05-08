import React, {Component} from 'react'
import {string} from 'prop-types'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from '..'
import configureStore from '../test/store/configure-store'
import App from './_app-component'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT
} from '../test/constants'

class SyncExample extends Component {
  static propTypes = {
    staticProp: string,
    syncReduxProp: string,
    asyncReduxSagaProp: string
  }

  static async getInitialProps({store}) {
    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT
    })

    store.dispatch({type: GET_ASYNC_REDUX_SAGA_PROP_TYPE})
    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    const {staticProp, syncReduxProp, asyncReduxSagaProp} = this.props

    return (
      <App>
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
      </App>
    )
  }
}

export default withRedux(configureStore, state => state)(
  withReduxSaga(SyncExample)
)
