import {
  GET_SYNC_REDUX_PROP_TYPE,
  GET_ASYNC_REDUX_SAGA_PROP_TYPE_SUCCESS,
  RESET_STORE_TYPE,
} from '../constants'

const initialState = {}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYNC_REDUX_PROP_TYPE:
      return {...state, syncReduxProp: action.data}
    case GET_ASYNC_REDUX_SAGA_PROP_TYPE_SUCCESS:
      return {...state, asyncReduxSagaProp: action.data}
    case RESET_STORE_TYPE:
      return initialState
    default:
      return state
  }
}

export default rootReducer
