
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import useAuth from 'utils/hooks/useAuth'
import {
  SIGN_IN_MENU_LINKS,
  SIGN_OFF_MENU_LINKS
} from 'utils/constants/top-bar-menu'
import LINKS from 'utils/constants/links'

const useMenu = () => {
  const router = useRouter();
  const { isLoggedIn, logOutHandler } = useAuth();

  const PROFILE_MENU_LINKS = useMemo(() =>
    isLoggedIn
      ? SIGN_IN_MENU_LINKS
      : SIGN_OFF_MENU_LINKS
    , [isLoggedIn]);

  const onMenuHandler = useCallback((item) => {
    switch (item.TITLE) {
      case LINKS.SIGN_OUT.TITLE:
        logOutHandler();
        return;
      default:
        if (router.pathname !== item.HREF) {
          router.push(item.HREF);
        }
    }
  }, [logOutHandler, router]);

  return {
    PROFILE_MENU_LINKS,
    onMenuHandler
  }
};

export default useMenu;