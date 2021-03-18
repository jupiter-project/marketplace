import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import clsx from 'clsx';

import Logo from 'components/Logo';
import NavBarMenu from './NavBarMenu';
import NavDropMenu from './NavDropMenu';
import { useCommonStyles } from 'styles/use-styles';

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
}));

const TopAppBar = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <AppBar position='relative' className={classes.appBar}>
      <Toolbar className={clsx(classes.toolBar, commonClasses.containerWidth)}>
        <Logo />
        <div className={classes.navContainer}>
          <NavBarMenu />
          <NavDropMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(TopAppBar);
