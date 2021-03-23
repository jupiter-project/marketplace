
import { combineReducers } from 'redux'

import loadingReducer from 'reducers/loadingReducer'
import authReducer from 'reducers/authReducer'
import popUpReducer from 'reducers/popUpReducer'

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  popUp: popUpReducer,
});