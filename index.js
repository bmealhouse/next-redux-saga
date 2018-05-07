import React, {Component} from 'react'
import {END} from 'redux-saga'

function hoc(config) {
  return BaseComponent => {
    class WrappedComponent extends Component {
      static async getInitialProps(props) {
        const {isServer, store} = props.ctx

        let pageProps
        if (BaseComponent.getInitialProps) {
          pageProps = await BaseComponent.getInitialProps(props)
        }

        // Keep saga running on the client (async mode)
        if (config.async && !isServer) {
          return pageProps
        }

        // Force saga to end in all other cases
        store.dispatch(END)
        await store.sagaTask.done

        // Restart saga on the client (sync mode)
        if (!isServer) {
          store.runSagaTask()
        }

        return pageProps
      }

      render() {
        return <BaseComponent {...this.props} />
      }
    }

    return WrappedComponent
  }
}

function withReduxSaga(arg) {
  const defaultConfig = {async: false}

  if (typeof arg === 'function') {
    return hoc(defaultConfig)(arg)
  }

  return hoc({...defaultConfig, ...arg})
}

export default withReduxSaga
