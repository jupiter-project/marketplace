
import { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FooterMenu from './FooterMenu'
import FooterAccount from './FooterAccount'
import FooterContact from './FooterContact'
import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'
import { useCommonStyles } from 'styles/use-styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.custom.palette.blue,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <footer className={classes.root}>
      <Grid container className={clsx(classes.container, commonClasses.containerWidth)}>
        <Grid item sm={12} md={6} lg={8}>
          <Grid container>
            <Grid item md={12} lg={6}>
              <FooterContact />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FooterMenu />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FooterAccount />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default memo(Footer);
