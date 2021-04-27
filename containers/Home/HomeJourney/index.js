
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
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  description: {
    fontSize: 16
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
          What is Leda?
        </Typography>
        <Typography className={classes.description} align='center'>
          NFT stands for not-fungible tokens and are unique digital items
          such as NFTs or artworks or game(hmm should this be in-game?)
          items. As an artist, by tokenizing your work you both ensure
          that it is unique and brand it as your work. The actual
          ownership is blockchian-managed. Leda uses the Jupiter blockchain,
          where NFT{"'"}s are called Singleton Asset Tokens.
        </Typography>
      </div>
    </section>
  );
};

export default memo(HomeJourney);