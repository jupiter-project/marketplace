
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, setUserToken } from 'actions/auth'

const useAuth = () => {
  const dispatch = useDispatch();
  const { accessToken = '' } = useSelector(state => state.auth);

  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const setLoginToken = useCallback(({ accessToken, user }) => {
    dispatch(setUserToken({ accessToken, user }));
  }, [dispatch]);

  return {
    isLoggedIn: !!accessToken,
    logOutHandler,
    setLoginToken
  }
};

export default useAuth;