import React from 'react'
import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import {RESET_STORE_TYPE} from '../constants'

function createSnapshot(WrappedComponent, props) {
  // Render is called by Next.js at runtime.
  const component = render(<WrappedComponent {...props} />)
  expect(toJson(component)).toMatchSnapshot()

  // Resets the store since it's being memoized during testing.
  props.store.dispatch({type: RESET_STORE_TYPE})
}

export default createSnapshot
