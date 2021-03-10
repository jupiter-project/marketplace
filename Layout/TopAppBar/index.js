import { memo } from 'react';
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import clsx from 'clsx';

import Logo from 'components/Logo';
import NavBarMenu from './NavBarMenu';
import NavDropMenu from './NavDropMenu';
import { useCommonStyles } from 'styles/use-styles';
import useMenu from 'utils/hooks/useMenu'
import LINKS from 'utils/constants/links';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: theme.custom.layout.topAppBarHeight,
    backgroundColor: theme.palette.background.secondary,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  account: {
    cursor: 'pointer',
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    border: `2px dotted ${theme.palette.primary.main}`
  }
}));

const TopAppBar = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const { onMenuHandler } = useMenu();

  const { accountRS = '' } = useSelector(state => state.auth);

  const onAccountHandler = () => {
    onMenuHandler(LINKS.MY_ACCOUNT)
  }

  return (
    <AppBar position='relative' className={classes.appBar}>
      <Toolbar className={clsx(classes.toolBar, commonClasses.containerWidth)}>
        <Logo />
        <div className={classes.navContainer}>
          {
            !!accountRS &&
            <Typography
              variant='body2'
              color='primary'
              className={classes.account}
              onClick={onAccountHandler}
            >
              {accountRS}
            </Typography>
          }
          <NavBarMenu />
          <NavDropMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(TopAppBar);
