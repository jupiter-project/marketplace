
import { memo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import AuthTab from './AuthTab'
import LOGIN_METHODS from 'utils/constants/login-methods'

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

const AuthTabs = ({
  method,
  setMethod
}) => {
  const classes = useStyles()

  const tabHandler = useCallback((value) => () => {
    setMethod(value)
  }, [setMethod])

  return (
    <div className={classes.root}>
      <AuthTab
        label={LOGIN_METHODS.ACCOUNT}
        isActive={method === LOGIN_METHODS.ACCOUNT}
        onTab={tabHandler(LOGIN_METHODS.ACCOUNT)}
      />
      <div className={classes.divider} />
      <AuthTab
        label={LOGIN_METHODS.PASSPHRASE}
        isActive={method === LOGIN_METHODS.PASSPHRASE}
        onTab={tabHandler(LOGIN_METHODS.PASSPHRASE)}
      />
    </div>
  )
}

export default memo(AuthTabs);