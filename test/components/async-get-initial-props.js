/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT,
} from '../constants'

class AsyncGetInitialProps extends Component {
  static getInitialProps(props) {
    const {store} = props.ctx

    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT,
    })

    store.dispatch({type: GET_ASYNC_REDUX_SAGA_PROP_TYPE})
    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    const {mode, staticProp, syncReduxProp, asyncReduxSagaProp} = this.props

    return (
      <div>
        AsyncGetInitialProps(
        {JSON.stringify({
          mode,
          staticProp,
          syncReduxProp,
          asyncReduxSagaProp,
        })}
        )
      </div>
    )
  }
}

export default connect(state => state)(AsyncGetInitialProps)
