/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT
} from '../constants'

class SyncGetInitialProps extends Component {
  static async getInitialProps(props) {
    const {store} = props.ctx

    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT
    })

    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    const {mode, staticProp, syncReduxProp} = this.props

    return (
      <div>
        SyncGetInitialProps({JSON.stringify({mode, staticProp, syncReduxProp})})
      </div>
    )
  }
}

export default connect(state => state)(SyncGetInitialProps)
