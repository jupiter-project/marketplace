
import { memo, useCallback, useState } from 'react'
import {
  Menu,
  MenuItem,
  Hidden,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import useMenu from 'utils/hooks/useMenu'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.custom.palette.grey}`,
    padding: theme.spacing(1)
  },
  menu: {
    color: theme.palette.background.default,
  },
  item: {
    borderRadius: 4,
    color: theme.palette.primary.main
  }
}));

const NavDropMenu = () => {
  const classes = useStyles();

  const { PROFILE_MENU_LINKS, onMenuHandler } = useMenu();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const itemHandler = useCallback((item) => () => {
    onMenuHandler(item)
  }, [onMenuHandler]);

  return (
    <>
      <Hidden mdUp>
        <IconButton
          aria-label='settings'
          onClick={handleClick}
        >
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
            {
              PROFILE_MENU_LINKS.map((item, index) => (
                <MenuItem
                  key={index}
                  className={classes.item}
                  onClick={itemHandler(item)}
                >
                  {item.TITLE}
                </MenuItem>
              ))
            }
          </div>
        </Menu>
      </Hidden>
    </>
  );
};

export default memo(NavDropMenu);