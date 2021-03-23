
import { memo, useCallback } from 'react'
import {
  Button,
  Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useMenu from 'utils/hooks/useMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    fontSize: 16,
    textTransform: 'unset',
    color: theme.palette.background.default
  }
}));

const NavBarMenu = () => {
  const classes = useStyles();
  const { PROFILE_MENU_LINKS, onMenuHandler } = useMenu();

  const onNavHandler = useCallback((item) => () => {
    onMenuHandler(item)
  }, [onMenuHandler])

  return (
    <Hidden smDown>
      <div className={classes.root}>
        {
          PROFILE_MENU_LINKS.map((item, index) => (
            <Button
              key={index}
              onClick={onNavHandler(item)}
              className={classes.item}
            >
              {item.TITLE}
            </Button>
          ))
        }
      </div>
    </Hidden>
  );
};

export default memo(NavBarMenu);