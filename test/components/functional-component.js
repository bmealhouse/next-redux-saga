import React from 'react'
import {connect} from 'react-redux'

function FunctionalComponent(props) {
  return <div>FunctionalComponent({JSON.stringify(props)})</div>
}

export default connect(state => state)(FunctionalComponent)
