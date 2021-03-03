
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import setLoadingStatus from 'actions/loading'

const useLoading = () => {
  const dispatch = useDispatch();

  const changeLoadingStatus = useCallback((loading) => {
    dispatch(setLoadingStatus(loading))
  }, [dispatch])

  return {
    changeLoadingStatus
  }
};

export default useLoading;