
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import {
  BLACK_LOGO_IMAGE_PATH,
  HOME_HEADER_BACKGROUND_IMAGE_PATH
} from 'utils/constants/image-paths'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(15, 3),
    minHeight: 790,
    backgroundImage: `url(${HOME_HEADER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'unset',
    },
  },
  container: {
    width: '100%',
    maxWidth: 760,
  },
  picture: {
    display: 'flex',
  },
  img: {
    width: '100%',
    objectFit: 'contain'
  },
  title: {
    fontSize: 45,
    textTransform: 'uppercase',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
      textAlign: 'center',
    },
    '& span': {
      color: theme.palette.primary.main
    }
  },
  description: {
    fontSize: 24,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      textAlign: 'center',
    },
  },
}));

const HomeHeader = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.container} >
        <picture className={classes.picture}>
          <source srcSet={BLACK_LOGO_IMAGE_PATH} />
          <img
            className={classes.img}
            src={BLACK_LOGO_IMAGE_PATH}
            alt='logo' />
        </picture>
        <Typography
          variant='h1'
          className={classes.title}
        >
          Jupiter based <span>NFT</span> Marketplace
        </Typography>
        <Typography
          variant='h5'
          color='textSecondary'
          className={classes.description}
        >
          Buy, sell and collect blockchain-secured digital items
        </Typography>
      </div>
    </section>
  );
};

export default memo(HomeHeader);