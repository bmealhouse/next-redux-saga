import React, {Component} from 'react'

import {
  GET_SYNC_REDUX_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE,
  STATIC_PROP_TEXT,
  SYNC_REDUX_PROP_TEXT
} from '../constants'

class AsyncGetInitialProps extends Component {
  static async getInitialProps({store}) {
    store.dispatch({
      type: GET_SYNC_REDUX_PROP_TYPE,
      data: SYNC_REDUX_PROP_TEXT
    })

    store.dispatch({type: GET_ASYNC_REDUX_SAGA_PROP_TYPE})
    return {staticProp: STATIC_PROP_TEXT}
  }

  render() {
    return <div>AsyncGetInitialProps({JSON.stringify(this.props)})</div>
  }
}

export default AsyncGetInitialProps
