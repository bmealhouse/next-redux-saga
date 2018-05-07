/* eslint-disable react/prop-types */
import React from 'react'
import {connect} from 'react-redux'

function FunctionalComponent({mode}) {
  return <div>FunctionalComponent({JSON.stringify({mode})})</div>
}

export default connect(state => state)(FunctionalComponent)
