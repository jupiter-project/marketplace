
import { memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Hidden
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import useMenu from 'utils/hooks/useMenu'
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  login: {
    fontSize: 16,
    borderRadius: 2,
    padding: theme.spacing(0.5, 1.5, 0),
    margin: theme.spacing(0, 1)
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
          PROFILE_MENU_LINKS.map((item, index) => {
            if (item.HREF === LINKS.SIGN_IN.HREF || item.HREF === LINKS.SIGN_OUT.HREF) {
              return (
                <ContainedButton
                  key={index}
                  onClick={onNavHandler(item)}
                  className={classes.login}
                >
                  {item.TITLE}
                </ContainedButton>
              )
            }

            return (
              <Button
                key={index}
                onClick={onNavHandler(item)}
                className={clsx(classes.item, { [classes.selected]: item.HREF === router.pathname })}
              >
                {item.TITLE}
              </Button>
            )
          })
        }
      </div>
    </Hidden>
  );
};

export default memo(NavBarMenu);