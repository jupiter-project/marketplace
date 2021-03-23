
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import { HOME_JOURNEY_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 580,
    backgroundImage: `url(${HOME_JOURNEY_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(3),
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    color: theme.custom.palette.white,
    maxWidth: 380,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
}));

const HomeJourney = () => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant='h1'
          className={classes.title}
        >
          Begin your NFT journey with Leda
        </Typography>
        {
          !accountRS &&
          <ContainedButton
            href={LINKS.SIGN_UP.HREF}
            className={classes.create}
          >
            Register
          </ContainedButton>
        }

      </div>
    </section>
  );
};

export default memo(HomeJourney);