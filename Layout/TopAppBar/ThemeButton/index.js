import { memo } from 'react';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useDarkMode } from 'contexts/ui-context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 40,
    height: 22,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(18px)',
      color: theme.custom.palette.white,
      '& + $track': {
        backgroundColor: theme.custom.palette.green,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.custom.palette.green,
      border: `6px solid ${theme.custom.palette.border}`,
    },
  },
  thumb: {
    width: 17,
    height: 17,
  },
  track: {
    borderRadius: 20,
    backgroundColor: theme.palette.background.default,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 12 12"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.text.secondary)
      )}" d="M6.30366 11.8743C2.89446 11.8743 0.120056 9.09991 0.120056 5.68951C0.120056 3.32791 1.43526 1.20631 3.55086 0.152713C3.64566 0.105913 3.76086 0.123913 3.83526 0.198313C3.90966 0.272713 3.93006 0.387913 3.88326 0.482713C3.49686 1.26751 3.30126 2.11111 3.30126 2.98951C3.30126 6.12631 5.85366 8.67871 8.99046 8.67871C9.87846 8.67871 10.7305 8.47831 11.5225 8.08471C11.6173 8.03791 11.7325 8.05591 11.8069 8.13031C11.8825 8.20591 11.9017 8.31991 11.8537 8.41471C10.8061 10.5483 8.67966 11.8743 6.30366 11.8743Z"/></svg>') center center no-repeat`,
      left: 20,
    },
    '&:after': {
      background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M277.3 32h-42.7v64h42.7V32zm129.1 43.7L368 114.1l29.9 29.9 38.4-38.4-29.9-29.9zm-300.8 0l-29.9 29.9 38.4 38.4 29.9-29.9-38.4-38.4zM256 128c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128zm224 106.7h-64v42.7h64v-42.7zm-384 0H32v42.7h64v-42.7zM397.9 368L368 397.9l38.4 38.4 29.9-29.9-38.4-38.4zm-283.8 0l-38.4 38.4 29.9 29.9 38.4-38.4-29.9-29.9zm163.2 48h-42.7v64h42.7v-64z"/></svg>') center center no-repeat`,
      right: 20,
    },
  },
  checked: {},
  focusVisible: {},
}));

const ThemeButton = () => {
  const classes = useStyles();
  const { darkMode, setDarkMode } = useDarkMode();

  const themeHandler = () => {
    setDarkMode(prev => !prev)
  };

  return (
    <Switch
      checked={darkMode}
      onChange={themeHandler}
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};

export default memo(ThemeButton);
