
import Router from 'next/router'

import LINKS from 'utils/constants/links'
import * as TYPES from './types'

const setUserToken = ({ accountRS, user }) => dispatch => {
  dispatch(setAccountRS(accountRS));
  dispatch(setCurrentUser(user));
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

const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch(setAccountRS(''));
  dispatch(setCurrentUser({}));
  Router.push(LINKS.SIGN_IN.HREF);
};

export {
  setUserToken,
  setAccountRS,
  setCurrentUser,
  logoutUser
}