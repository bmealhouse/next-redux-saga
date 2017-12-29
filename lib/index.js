import React, {Component} from 'react'
import {END} from 'redux-saga'

function withReduxSaga(BaseComponent) {
  class WrappedComponent extends Component {
    static async getInitialProps(ctx) {
      const {store, isServer} = ctx

      let props
      if (BaseComponent.getInitialProps) {
        props = await BaseComponent.getInitialProps(ctx)
      }
      store.dispatch(END)
      await store.sagaTask.done

      if (!isServer) {
        store.runSagaTask()
      }
      return props
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }

  return WrappedComponent
}

export default withReduxSaga
