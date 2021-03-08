
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import scrollToTop from 'utils/helpers/scrollToTop'
import { PAGE_ROUTES } from 'utils/constants/routes'
import LINKS from 'utils/constants/links'

const InitProvider = () => {
  const router = useRouter();
  const { accessToken = '' } = useSelector(state => state.auth);

  useEffect(() => {
    if (!accessToken) {
      if (PAGE_ROUTES.includes(router.pathname)) {
        router.push(LINKS.HOME.HREF)
      }
    }

    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, accessToken])

  return <div />
};

export default memo(InitProvider);