import React, {Component} from 'react'
import {func} from 'prop-types'
import {END} from 'redux-saga'

function withReduxSaga(BaseComponent) {
  class WrappedComponent extends Component {
    static async getInitialProps(ctx) {
      const {store} = ctx

      let props = {}
      if (BaseComponent.getInitialProps) {
        props = await BaseComponent.getInitialProps(ctx)
      }
      props.runSagaTask = store.runSagaTask

      store.dispatch(END)
      await store.sagaTask.done

      return props
    }

    static propTypes = {
      runSagaTask: func
    }

    constructor(props) {
      super(props)
      if (this.props.runSagaTask !== undefined) {
        this.props.runSagaTask()
      }
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }

  return WrappedComponent
}

export default withReduxSaga
