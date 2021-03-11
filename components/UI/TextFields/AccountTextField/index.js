
import React, { memo, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TextField
} from '@material-ui/core'
import clsx from 'clsx'

import TextMaskCustom from 'components/UI/TextFields/TextMaskCustom'
import { isEmpty } from 'utils/helpers/utility'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  textField: {
    width: '100%',

  },
  inputRoot: {
    '&:hover:before': {
      border: '0 !important'
    },
    '&::after': {
      border: '0 !important'
    },
    '&::before': {
      border: '0 !important'
    }
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.background.primary}`,
    borderRadius: 8,
    backgroundColor: theme.palette.background.primary,
    color: theme.custom.palette.lightBlack
  },
  errorInput: {
    border: `1px solid ${theme.palette.danger.main}`
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1.5, 1)
  },
  optional: {
    fontStyle: 'italic'
  },
  error: {
    padding: theme.spacing(1, 1.5, 0)
  },
}));

const AccountTextField = React.forwardRef(({
  error,
  mask,
  label,
  isOption = false,
  placeholder,
  className,
  onChange,
  endAdornment,
  ...rest
}, ref) => {

  const classes = useStyles();

  const inputComponent = useMemo(() => {
    if (!isEmpty(mask)) {
      return {
        inputComponent: TextMaskCustom
      }
    }
  }, [mask]);

  return (
    <div className={clsx(classes.root, className)}>
      {
        !!label &&
        <div className={classes.labelContainer}>
          <Typography color='textSecondary' >
            {label}
          </Typography>

          {
            isOption &&
            <Typography
              color='textSecondary'
              variant='body2'
              className={classes.optional}
            >
              (Optional)
            </Typography>
          }
        </div>
      }

      <TextField
        {...rest}
        fullWidth
        error={!!error}
        inputRef={ref}
        className={classes.textField}
        InputProps={{
          ...inputComponent,
          endAdornment,
          inputProps: {
            mask,
            placeholder
          },
          classes: {
            root: classes.inputRoot,
            input: clsx(classes.input, { [classes.errorInput]: !!error })
          }
        }}
        onChange={(e) => onChange(e.target.value)}
      />

      {
        !!error &&
        <Typography
          variant='subtitle2'
          color='error'
          className={classes.error}
        >
          {error}
        </Typography>
      }
    </div>
  );
});

export default memo(AccountTextField);