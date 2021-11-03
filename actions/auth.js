
import Router from 'next/router'

import LINKS from 'utils/constants/links'
import * as TYPES from './types'

const setUserToken = ({ accountRS, user, isWallet = false }) => dispatch => {
  dispatch(setAccountRS(accountRS));
  dispatch(setCurrentUser(user));
  dispatch(setIsWallet(isWallet));
  Router.push(LINKS.MARKETPLACE.HREF);
};

const setAccountRS = accountRS => {
  localStorage.setItem('accountRS', accountRS);
  return {
    type: TYPES.SET_ACCOUNT_RS,
    payload: accountRS
  };
};

const setCurrentUser = currentUser => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: currentUser
  };
};

const setIsWallet = isWallet => {
  localStorage.setItem('isWallet', isWallet);
  return {
    type: TYPES.SET_IS_WALLET,
    payload: isWallet
  };
};

const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch(setAccountRS(''));
  dispatch(setCurrentUser({}));
  dispatch(setIsWallet(false));
  Router.push(LINKS.HOME.HREF);
};

export {
  setUserToken,
  setAccountRS,
  setCurrentUser,
  setIsWallet,
  logoutUser
}