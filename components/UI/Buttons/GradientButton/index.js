
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import OutlinedButton from 'components/UI/Buttons/OutlinedButton'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 160,
    borderColor: theme.custom.palette.lightBlue,
    backgroundColor: theme.custom.palette.lightBlue
  }
}));

const GradientButton = React.forwardRef(({
  className,
  children,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <OutlinedButton
      ref={ref}
      className={clsx(className, classes.root)}
      {...rest}>
      {children}
    </OutlinedButton>
  );
});

export default memo(GradientButton);
