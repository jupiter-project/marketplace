
import { memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useMenu from 'utils/hooks/useMenu'
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    fontSize: 18,
    textTransform: 'unset',
    color: theme.palette.background.default
  },
  selected: {
    color: theme.palette.primary.main
  }
}));

const NavBarMenu = () => {
  const classes = useStyles();
  const router = useRouter()
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
              className={clsx(classes.item, { [classes.selected]: item.HREF === router.pathname })}
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