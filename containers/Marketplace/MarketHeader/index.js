
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import {
  LOGO_IMAGE_PATH,
  HEADER_BACKGROUND_IMAGE_PATH
} from 'utils/constants/image-paths'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: 340,
    backgroundImage: `url(${HEADER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      minHeight: 240,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    padding: theme.spacing(2)
  },
  picture: {
    display: 'flex',
  },
  img: {
    width: 200,
    height: 80,
    objectFit: 'contain'
  },
  description: {
    fontWeight: 'bold',
    '& span': {
      color: theme.palette.primary.main
    }
  }
}));

const MarketHeader = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <picture className={classes.picture}>
          <source srcSet={LOGO_IMAGE_PATH} />
          <img
            className={classes.img}
            src={LOGO_IMAGE_PATH}
            alt='logo' />
        </picture>
        <Typography
          variant='h6'
          color='textPrimary'
          className={classes.description}
        >
          DECENTRALIZED <span>NFT</span> MARKET SITE
        </Typography>
      </div>
    </main>
  );
};

export default memo(MarketHeader);
