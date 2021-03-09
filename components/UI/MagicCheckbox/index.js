
import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 0,
    marginRight: theme.spacing(0.75),
    color: theme.custom.palette.green,
    '&$checked': {
      color: theme.custom.palette.green,
    },
  }
}));

const MagicCheckbox = React.forwardRef(({
  className,
  ...rest
}, ref) => {
  const classes = useStyles();

  return (
    <Checkbox
      inputRef={ref}
      color='default'
      className={clsx(classes.checkbox, className)}
      inputProps={{
        'aria-label': 'checkbox',
      }}
      {...rest}
    />
  );
});

export default memo(MagicCheckbox);
