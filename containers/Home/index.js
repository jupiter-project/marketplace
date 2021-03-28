
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import HomeHeader from './HomeHeader'
import CreatorAndCollector from './CreatorAndCollector'
import UserFeedback from './UserFeedback'
import NFTCarousel from 'parts/NFTCarousel'
import HomeFAQs from './HomeFAQs'
import HomeJourney from './HomeJourney'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
      margin: theme.spacing(5, 0),
    },
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <HomeHeader />
      <Typography variant='h1' className={classes.title}>
        New NFT Tokens
      </Typography>
      <NFTCarousel />
      <CreatorAndCollector />
      <UserFeedback />
      <HomeFAQs />
      <HomeJourney />
    </main>
  )
}

export default memo(Home)