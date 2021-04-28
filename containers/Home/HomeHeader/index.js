
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  HOME_LOGO_IMAGE_PATH,
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
}));

const HomeHeader = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div className={classes.container} >
        <picture className={classes.picture}>
          <source srcSet={HOME_LOGO_IMAGE_PATH} />
          <img
            className={classes.img}
            src={HOME_LOGO_IMAGE_PATH}
            alt='logo' />
        </picture>
      </div>
    </section>
  );
};

export default memo(HomeHeader);