
import * as TYPES from 'actions/types'

const initialState = {
  accountRS: '',
  currentUser: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_ACCOUNT_RS:
      return {
        ...state,
        accountRS: action.payload
      };
    case TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}