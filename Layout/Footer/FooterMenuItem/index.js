
import { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import useMenu from 'utils/hooks/useMenu'

const useStyles = makeStyles(theme => ({
  item: {
    cursor: 'pointer',
    color: theme.palette.background.default,
    margin: theme.spacing(1, 0),
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

const FooterMenuItem = ({
  menu
}) => {
  const classes = useStyles();
  const { onMenuHandler } = useMenu();

  const onNavHandler = useCallback(() => {
    onMenuHandler(menu)
  }, [menu, onMenuHandler]);

  return (
    <Typography
      variant='h6'
      className={classes.item}
      onClick={onNavHandler}
    >
      {menu.TITLE}
    </Typography>
  );
};

export default memo(FooterMenuItem);
