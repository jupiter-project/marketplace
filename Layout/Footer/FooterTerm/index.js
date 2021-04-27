
import { memo } from 'react'
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

const FooterTerm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant='body2'
        className={classes.title}
      >
        TERMS
      </Typography>
      <Grid container>
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

export default memo(FooterTerm);