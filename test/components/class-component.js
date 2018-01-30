import React, {Component} from 'react'

class ClassComponent extends Component {
  render() {
    return <div>ClassComponent({JSON.stringify(this.props)})</div>
  }
}

export default ClassComponent
