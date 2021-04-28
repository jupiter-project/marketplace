
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ImageWall from 'parts/ImageWall'
import MyBalance from './MyBalance'
import EditAccount from './EditAccount'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: theme.custom.layout.maxDesktopWidth,
    margin: theme.spacing(7, 0, 13),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2.5, 0)
    }
  },
}));

const MyAccount = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={classes.root}>
      <ImageWall header='My Account' />
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <MyBalance />
        <EditAccount />
      </div>
    </main>
  )
}

export default memo(MyAccount)