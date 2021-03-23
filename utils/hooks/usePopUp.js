import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setPopUpInfo,
  openPopUp,
  closePopUp
} from 'actions/popUp'

const usePopUp = () => {
  const dispatch = useDispatch()
  const popUpInfo = useSelector(state => state.popUp)

  const setPopUp = useCallback((data) => {
    dispatch(setPopUpInfo(data))
  }, [dispatch])

  const openPopUpHandler = useCallback(() => {
    dispatch(openPopUp())
  }, [dispatch])

  const closePopUpHandler = useCallback(() => {
    dispatch(closePopUp())
  }, [dispatch])

  return {
    popUpInfo,
    setPopUp,
    openPopUpHandler,
    closePopUpHandler
  }
}

export default usePopUp
