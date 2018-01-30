import React, {Component} from 'react'
import {string} from 'prop-types'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from '../lib'
import App from './_components/app'
import configureStore from './_store/configure-store'

class DefaultExample extends Component {
  static propTypes = {
    staticProp: string,
    syncReduxProp: string,
    asyncReduxSagaProp: string
  }

  static async getInitialProps({store}) {
    store.dispatch({type: 'RESET_STORE'})

    store.dispatch({
      type: 'GET_SYNC_REDUX_PROP',
      data: 'Synchronous message from Redux.'
    })

    store.dispatch({type: 'GET_ASYNC_REDUX_SAGA_PROP'})
    return {staticProp: 'Static message from getInitialProps().'}
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
  withReduxSaga({async: true})(DefaultExample)
)
