
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import HomeImageWall from './HomeImageWall'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingTop: 110,
    paddingBottom: 110,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 50,
      paddingBottom: 50,
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <main className={clsx(classes.root, commonClasses.containerWidth)}>
      <HomeImageWall />
    </main>
  )
}

export default memo(Home)