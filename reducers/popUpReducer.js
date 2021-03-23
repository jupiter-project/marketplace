
import * as TYPES from 'actions/types'

const initialState = {
  open: false,
  title: 'Alert',
  text: '',
  cancelLabel: 'Ok'
};

export default function popUpReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_POP_UP_INFO:
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    case TYPES.OPEN_POP_UP:
      return { ...state, open: true };
    case TYPES.CLOSE_POP_UP:
      return initialState;
    default:
      return state;
  }
}
