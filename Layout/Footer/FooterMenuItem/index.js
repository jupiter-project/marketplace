
import { memo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  item: {
    cursor: 'pointer',
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
  const router = useRouter();

  const onNavHandler = useCallback(() => {
    router.push(menu.HREF)
  }, [menu, router]);

  return (
    <Typography
      variant='subtitle1'
      color='primary'
      className={classes.item}
      onClick={onNavHandler}
    >
      {menu.TITLE}
    </Typography>
  );
};

export default memo(FooterMenuItem);
