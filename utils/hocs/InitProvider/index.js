
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import {
  setAccountRS,
  setCurrentUser,
  setIsWallet,
} from 'actions/auth'
import scrollToTop from 'utils/helpers/scrollToTop'
import { PAGE_ROUTES } from 'utils/constants/routes'
import LINKS from 'utils/constants/links'
import { isServer } from 'utils/helpers/utility'

const InitProvider = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const accountRS = isServer() ? '' : localStorage.accountRS;
    const currentUser = isServer() ? null : localStorage.currentUser;
    const isWallet = isServer() ? null : localStorage.isWallet;

    if (!!accountRS) {
      dispatch(setAccountRS(accountRS))
    }

    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)))
    }

    if (!!isWallet) {
      dispatch(setIsWallet(isWallet === 'true'))
    }
  }, [dispatch])

  useEffect(() => {
    const accountRS = isServer() ? '' : localStorage.accountRS;

    if (!accountRS) {
      if (PAGE_ROUTES.includes(router.pathname)) {
        router.push(LINKS.HOME.HREF)
      }
    }

    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return <div />
};

export default memo(InitProvider);