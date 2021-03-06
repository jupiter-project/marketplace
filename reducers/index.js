
import { combineReducers } from 'redux'

import loadingReducer from 'reducers/loadingReducer'
import authReducer from 'reducers/authReducer'

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
});