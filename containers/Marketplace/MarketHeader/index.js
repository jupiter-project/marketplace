
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { HEADER_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'

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
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.custom.layout.maxMarketPlaceWidth,
    padding: theme.spacing(2)
  },
  description: {
    fontSize: 56,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  }
}));

const MarketHeader = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography
          color='textPrimary'
          className={classes.description}
        >
          MARKETPLACE
        </Typography>
      </div>
    </main>
  );
};

export default memo(MarketHeader);
