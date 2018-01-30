import React, {Component} from 'react'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT
} from '../constants'

class SyncGetInitialProps extends Component {
  static async getInitialProps({store}) {
    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT
    })

    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    return <div>SyncGetInitialProps({JSON.stringify(this.props)})</div>
  }
}

export default SyncGetInitialProps
