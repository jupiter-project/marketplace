import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import OutlinedButton from 'components/UI/Buttons/OutlinedButton'
import GradientButton from 'components/UI/Buttons/GradientButton'
import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 700,
    borderRadius: 10,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset'
    },
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 68,
    lineHeight: 'initial',
    padding: theme.spacing(0, 6),
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover'
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.custom.palette.white
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(2),
    color: theme.custom.palette.white
  },
  dialogContent: {
    width: '100%',
    minWidth: 600,
    minHeight: 130,
    padding: theme.spacing(4, 2),
    [theme.breakpoints.down('sm')]: {
      minWidth: 520
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      padding: theme.spacing(2, 1)
    }
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2, 3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 1.5, 1),
      flexDirection: 'column'
    }
  },
  button: {
    width: '50%',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(1, 0),
    }
  }
}));

const MagicDialog = ({
  open,
  title,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
  confirmDisable = false,
  children
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.paper
      }}
      aria-labelledby='customized-dialog-title'
    >
      <DialogTitle
        id='customized-dialog-title'
        disableTypography
        align='center'
        className={classes.dialogTitle}
      >
        <Typography
          variant='h6'
          className={classes.title}
        >
          {title}
        </Typography>
        <IconButton
          edge='end'
          aria-label='close'
          className={classes.closeIcon}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
      {
        (!!cancelLabel || !!confirmLabel) &&
        <DialogActions
          disableSpacing
          className={classes.dialogActions}
        >
          {
            !!cancelLabel &&
            <OutlinedButton
              autoFocus
              onClick={onCancel}
              className={classes.button}
            >
              {cancelLabel}
            </OutlinedButton>
          }
          {
            !!confirmLabel &&
            <GradientButton
              disabled={confirmDisable}
              onClick={onConfirm}
              className={classes.button}
            >
              {confirmLabel}
            </GradientButton>
          }
        </DialogActions>
      }
    </Dialog>
  );
}

export default memo(MagicDialog)