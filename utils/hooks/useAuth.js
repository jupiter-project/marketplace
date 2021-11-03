
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser, setUserToken } from 'actions/auth'

const useAuth = () => {
  const dispatch = useDispatch();
  const { accountRS = '', isWallet } = useSelector(state => state.auth);

  const logOutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const setLoginToken = useCallback(({ accountRS, user, isWallet = false }) => {
    dispatch(setUserToken({ accountRS, user, isWallet }));
  }, [dispatch]);

  return {
    isLoggedIn: !!accountRS,
    accountRS,
    isWallet,
    logOutHandler,
    setLoginToken
  }
};

export default useAuth;