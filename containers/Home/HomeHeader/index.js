
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import OutlinedButton from 'components/UI/Buttons/OutlinedButton'
import { HOME_HEADER_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }
  },
  textContainer: {
    padding: theme.spacing(20),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
  },
  buttonContainer: {
    display: 'flex',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  create: {
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2.5),
    }
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: `url(${HOME_HEADER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 465,
    width: '100%',
  },
  opacityTop: {
    background: 'linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)',
    height: 160,
  },
  opacityBottom: {
    background: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)',
    height: 160,
  },
}));

const HomeHeader = () => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);

  return (
    <section className={classes.root}>
      <Grid container className={classes.container} >
        <Grid item sm={12} md={6} className={classes.textContainer} >
          <Typography
            variant='h1'
            className={classes.title}
          >
            Leda is the official marketplace for Jupiter NFTs
          </Typography>
          <Typography
            variant='h5'
            color='textSecondary'
            className={classes.description}
          >
            Create, sell or collect digital items secured with blockchain
          </Typography>

          <div className={classes.buttonContainer}>
            {accountRS
              ? (
                <>
                  <ContainedButton
                    href={LINKS.CREATE_NFT.HREF}
                    className={classes.create}
                  >
                    Create NFT
                  </ContainedButton>
                  <OutlinedButton href={LINKS.MARKETPLACE.HREF} >
                    Marketplace
                  </OutlinedButton>
                </>
              ) : (
                <>
                  <ContainedButton
                    href={LINKS.SIGN_IN.HREF}
                    className={classes.create}
                  >
                    Log In
                  </ContainedButton>
                  <OutlinedButton href={LINKS.SIGN_UP.HREF} >
                    Register
                  </OutlinedButton>
                </>
              )}
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.imageContainer} >
          <div className={classes.opacityTop} />
          <div className={classes.opacityBottom} />
        </Grid>
      </Grid>
    </section>
  );
};

export default memo(HomeHeader);