
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Identicon from 'react-identicons';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '50%',
    border: `2px solid ${theme.custom.palette.grey}`
  }
}));

const MagicIdenticon = ({
  value,
  size = 50,
  className
}) => {
  const classes = useStyles();

  return (
    <Identicon
      className={clsx(classes.root, className)}
      string={value}
      size={size}
      count={5}
    />
  );
};

export default memo(MagicIdenticon);