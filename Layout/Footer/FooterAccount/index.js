
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
    marginBottom: theme.spacing(1)
  }
}));

const FooterAccount = () => {
  const classes = useStyles();
  const { accountRS = '' } = useSelector(state => state.auth);

  return (
    <div className={classes.root}>
      <Typography
        variant='body2'
        className={classes.title}
      >
        ACCOUNT
      </Typography>
      <Grid container>
        {accountRS
          ? (
            <>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.CREATE_NFT} />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.MY_ACCOUNT} />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.MY_NFTS} />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.SIGN_OUT} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.SIGN_IN} />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FooterMenuItem menu={LINKS.SIGN_UP} />
              </Grid>
            </>
          )
        }
      </Grid>
    </div>
  );
};

export default memo(FooterAccount);