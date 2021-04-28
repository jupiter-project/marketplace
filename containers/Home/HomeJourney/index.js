
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(10, 0)
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1020,
    padding: theme.spacing(3),
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'CRC-LIGHT',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  description: {
    fontSize: 18,
    marginBottom: theme.spacing(4),
  }
}));

const HomeJourney = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant='h1'
          className={classes.title}
        >
          WHAT IS LEDA?
        </Typography>
        <Typography className={classes.description} align='center'>
          Leda is an NFT marketplace, that uses the Jupiter blockchain.A Non-Fungible
          Token (NFT) (or called Singleton Asset Token on Jupiter) is a unit of data
          stored on a blockchain that certifies a digital asset to be unique and
          therefore not interchangeable.
        </Typography>
        <Typography className={classes.description} align='center'>
          NFTs can be used to represent items such as photos, videos, audios, in-game
          items, and any other type of digital file. As an artist, by tokenizing your
          work, you ensure that it is unique and that the ownership is provably  yours.
        </Typography>
        <Typography className={classes.description} align='center'>
          Start your NFT journey with Leda!
        </Typography>
        <Typography className={classes.description} align='center'>
          No code knowledge required. Easily upload your content and create your NFT
          with a few clicks.
        </Typography>
      </div>
    </section>
  );
};

export default memo(HomeJourney);