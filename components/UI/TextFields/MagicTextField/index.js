
import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  OutlinedInput
} from '@material-ui/core'
import clsx from 'clsx'

import GreyEyeIcon from 'components/Icons/GreyEyeIcon'
import GreyEyeCloseIcon from 'components/Icons/GreyEyeCloseIcon'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  textField: {
    width: '100%',
    border: `1px solid ${theme.palette.background.primary}`,
    borderRadius: 8,
    backgroundColor: theme.palette.background.primary,
  },
  input: {
    fontSize: 18,
    fontFamily: 'roboto, sans-serif',
    lineHeight: 'normal',
    padding: theme.spacing(1.5),
    color: theme.custom.palette.lightBlack,
    '&:focus': {
      backgroundColor: 'unset'
    },
    '&::placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    },
    '&:-ms-input-placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    },
    '&::-ms-input-placeholder': {
      lineHeight: 'normal',
      color: theme.palette.text.secondary
    }
  },
  multiline: {
    padding: 0
  },
  notchedOutline: {
    border: 'none'
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
  eyeIcon: {
    cursor: 'pointer'
  }
}));

const MagicTextField = React.forwardRef(({
  label,
  type = 'text',
  error,
  isOption = false,
  className,
  ...rest
}, ref) => {

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const eyeIconHandler = () => {
    setShowPassword(prev => !prev)
  }

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

      <OutlinedInput
        inputRef={ref}
        variant='outlined'
        type={showPassword ? 'text' : type}
        error={!!error}
        endAdornment={
          type === 'password' && (
            showPassword
              ? (
                <GreyEyeCloseIcon
                  className={classes.eyeIcon}
                  onClick={eyeIconHandler}
                />
              ) : (
                <GreyEyeIcon
                  className={classes.eyeIcon}
                  onClick={eyeIconHandler}
                />
              )
          )
        }
        className={clsx(
          'form-control form-control-lg',
          classes.textField
        )}
        classes={{
          input: classes.input,
          multiline: classes.multiline,
          error: classes.errorInput,
          notchedOutline: classes.notchedOutline
        }}
        {...rest}
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

export default memo(MagicTextField);