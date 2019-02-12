import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

function createSnapshot(WrappedComponent, props) {
  // Render is called by Next.js at runtime.
  const component = shallow(<WrappedComponent {...props} />).dive()
  expect(toJson(component)).toMatchSnapshot()
}

export default createSnapshot
