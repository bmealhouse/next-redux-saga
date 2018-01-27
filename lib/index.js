import React, {Component} from 'react'
import {END} from 'redux-saga'

function withReduxSaga(...args) {
  let config = {async: false}
  let result

  if (typeof args[0] === 'object') {
    config = {...config, ...args[0]}
    result = targetDecorator
  } else {
    result = targetDecorator(...args)
  }

  function targetDecorator(Target) {
    class WrappedComponent extends Component {
      static async getInitialProps(ctx) {
        const {store, isServer} = ctx

        let props
        if (Target.getInitialProps) {
          props = await Target.getInitialProps(ctx)
        }

        if (config.async) {
          if (isServer) {
            store.dispatch(END)
            await store.sagaTask.done
          }
        } else {
          store.dispatch(END)
          await store.sagaTask.done

          if (!isServer) {
            store.runSagaTask()
          }
        }

        return props
      }

      render() {
        return <Target {...this.props} />
      }
    }

    return WrappedComponent
  }

  return result
}

export default withReduxSaga
