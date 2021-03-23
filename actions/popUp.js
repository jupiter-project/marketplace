import * as TYPES from './types'

const setPopUpInfo = (data) => (dispatch) => {
  dispatch({
    type: TYPES.SET_POP_UP_INFO,
    payload: data
  })
}

const openPopUp = () => (dispatch) => {
  dispatch({ type: TYPES.OPEN_POP_UP })
}

const closePopUp = () => (dispatch) => {
  dispatch({ type: TYPES.CLOSE_POP_UP })
}

export {
  setPopUpInfo,
  openPopUp,
  closePopUp
}
