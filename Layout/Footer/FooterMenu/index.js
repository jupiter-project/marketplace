
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import FooterMenuItem from '../FooterMenuItem'
import FOOTER_MENU from 'utils/constants/footer-menu'
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
          FOOTER_MENU.filter((item) => !!accountRS || item.HREF !== LINKS.CREATE_NFT.HREF)
            .map((menuItem, index) => (
              <Grid item key={index} xs={6} sm={12}>
                <FooterMenuItem
                  menu={menuItem}
                />
              </Grid>
            ))
        }
      </Grid>
    </div>
  );
};

export default memo(FooterMenu);
