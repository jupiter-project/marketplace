
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));

const MyAccount = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={classes.root}>
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        My Account
      </div>
    </main>
  )
}

export default memo(MyAccount)