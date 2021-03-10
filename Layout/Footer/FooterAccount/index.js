
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import FooterMenuItem from '../FooterMenuItem'
import LINKS from 'utils/constants/links'

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

const FooterAccount = () => {
  const classes = useStyles();
  const { accountRS = '' } = useSelector(state => state.auth);

  return (
    <div className={classes.root}>
      <Typography
        variant='h5'
        className={classes.title}
      >
        Account
      </Typography>
      <Grid container>
        {
          accountRS
            ? (
              <>
                <Grid item xs={6} sm={12}>
                  <FooterMenuItem menu={LINKS.MY_ACCOUNT} />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <FooterMenuItem menu={LINKS.SIGN_OUT} />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} sm={12}>
                  <FooterMenuItem menu={LINKS.SIGN_UP} />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <FooterMenuItem menu={LINKS.SIGN_IN} />
                </Grid>
              </>
            )
        }
        <Grid item xs={6} sm={12}>
          <FooterMenuItem menu={LINKS.TERMS_OF_SERVICE} />
        </Grid>
        <Grid item xs={6} sm={12}>
          <FooterMenuItem menu={LINKS.PRIVACY_POLICY} />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(FooterAccount);