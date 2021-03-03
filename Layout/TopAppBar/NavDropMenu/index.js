
import { memo, useCallback, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import {
  Menu,
  MenuItem,
  Hidden,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';

import { AccountContext } from 'context/AccountContext'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.custom.palette.grey}`,
    padding: theme.spacing(1)
  },
  menu: {
    color: theme.palette.primary.main
  },
  item: {
    borderRadius: 4,
    color: theme.palette.text.primary,
  },
  account: {
    display: 'none',
    fontSize: 10,
    borderRadius: 4,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  }
}));

const NavDropMenu = () => {
  const classes = useStyles();
  const router = useRouter();

  const { account } = useContext(AccountContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const itemHandler = (href) => () => {
    router.push(href)
  }

  return (
    <>
      <Hidden mdUp>
        <IconButton aria-label='settings' onClick={handleClick}>
          <MenuIcon className={classes.menu} />
        </IconButton>
        <Menu
          id='customized-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.menu}
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.paper
          }}
        >
          <div>
            <MenuItem
              className={classes.item}
              onClick={itemHandler(LINKS.CREATE_COLLECT.HREF)}
            >
              Create
            </MenuItem>
            <MenuItem
              className={classes.item}
              onClick={itemHandler(LINKS.DASHBOARD.HREF)}
            >
              Dashboard
            </MenuItem>
            {
              !!account &&
              <MenuItem className={classes.account}>
                {account}
              </MenuItem>
            }
          </div>
        </Menu>
      </Hidden>
    </>
  );
};

export default memo(NavDropMenu);