const initialState = {}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESET_STORE':
      return initialState
    case 'GET_SYNC_REDUX_PROP':
      return {...state, syncReduxProp: action.data}
    case 'GET_ASYNC_REDUX_SAGA_PROP_SUCCESS':
      return {...state, asyncReduxSagaProp: action.data}
    default:
      return state
  }
}

export default rootReducer
