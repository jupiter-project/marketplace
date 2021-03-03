
import { memo, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { AccountContext } from 'context/AccountContext'
import scrollToTop from 'utils/helpers/scrollToTop'
import { PAGE_ROUTES } from 'utils/constants/routes'
import LINKS from 'utils/constants/links'

const InitProvider = () => {
  const router = useRouter();
  const { account } = useContext(AccountContext);

  useEffect(() => {
    if (!account) {
      if (PAGE_ROUTES.includes(router.pathname)) {
        router.push(LINKS.HOME.HREF)
      }
    }

    scrollToTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, account])

  return <div />
};

export default memo(InitProvider);