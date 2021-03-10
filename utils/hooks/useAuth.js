
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, setUserToken } from 'actions/auth'

const useAuth = () => {
  const dispatch = useDispatch();
  const { accountRS = '' } = useSelector(state => state.auth);

  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const setLoginToken = useCallback(({ accountRS, user }) => {
    dispatch(setUserToken({ accountRS, user }));
  }, [dispatch]);

  return {
    isLoggedIn: !!accountRS,
    logOutHandler,
    setLoginToken
  }
};

export default useAuth;