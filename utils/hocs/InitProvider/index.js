
import { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import {
  setAccountRS,
  setCurrentUser,
} from 'actions/auth'
import scrollToTop from 'utils/helpers/scrollToTop'
import { PAGE_ROUTES } from 'utils/constants/routes'
import LINKS from 'utils/constants/links'
import { isServer } from 'utils/helpers/utility'

const InitProvider = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accountRS = '' } = useSelector(state => state.auth);

  useEffect(() => {
    const accountRS = isServer() ? '' : localStorage.accountRS;
    const currentUser = isServer() ? null : localStorage.currentUser;

    if (!!accountRS) {
      dispatch(setAccountRS(accountRS))
    }

    if (!!currentUser) {
      dispatch(setCurrentUser(JSON.parse(currentUser)))
    }
  }, [dispatch])

  useEffect(() => {
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