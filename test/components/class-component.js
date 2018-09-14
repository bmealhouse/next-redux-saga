/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {connect} from 'react-redux'

class ClassComponent extends Component {
  render() {
    const {mode} = this.props
    return (
      <div>
        ClassComponent(
        {JSON.stringify({mode})})
      </div>
    )
  }
}

export default connect(state => state)(ClassComponent)
