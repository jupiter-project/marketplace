
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import FooterMenuItem from '../FooterMenuItem'
import {
  DEFAULT_FOOTER_MENU,
  SIGN_IN_FOOTER_MENU
} from 'utils/constants/footer-menu'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5, 0)
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.background.default,
    marginBottom: theme.spacing(1.5)
  }
}));

const FooterMenu = () => {
  const classes = useStyles();
  const { accountRS = '' } = useSelector(state => state.auth);

  return (
    <div className={classes.root}>
      <Typography
        variant='h5'
        className={classes.title}
      >
        Menu
      </Typography>
      <Grid container>
        {
          DEFAULT_FOOTER_MENU.map((menuItem) => (
            <Grid item key={menuItem.TITLE} xs={6} sm={12}>
              <FooterMenuItem menu={menuItem} />
            </Grid>
          ))
        }
        {
          !!accountRS &&
          SIGN_IN_FOOTER_MENU.map((menuItem) => (
            <Grid item key={menuItem.TITLE} xs={6} sm={12}>
              <FooterMenuItem menu={menuItem} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default memo(FooterMenu);
