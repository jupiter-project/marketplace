
import { memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import AuthTab from './AuthTab'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(3.5)
  },
  divider: {
    width: 32
  }
}));

const AuthTabs = () => {
  const classes = useStyles()
  const router = useRouter();
  const { pathname } = router;

  const tabHandler = useCallback((href) => () => {
    router.push(href)
  }, [router])

  return (
    <div className={classes.root}>
      <AuthTab
        label='Sign In'
        isActive={pathname === LINKS.SIGN_IN.HREF}
        onTab={tabHandler(LINKS.SIGN_IN.HREF)}
      />
      <div className={classes.divider} />
      <AuthTab
        label='Sign Up'
        isActive={pathname === LINKS.SIGN_UP.HREF}
        onTab={tabHandler(LINKS.SIGN_UP.HREF)}
      />
    </div>
  )
}

export default memo(AuthTabs);