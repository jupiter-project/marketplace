
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles(theme => ({
  toastContainer: {
    padding: theme.spacing(1),
    '& .Toastify__toast--error': {
      backgroundColor: theme.custom.palette.pink
    },
    '& .Toastify__toast--info': {
      backgroundColor: theme.palette.primary.main
    },
    '& .Toastify__toast--success': {
      backgroundColor: theme.palette.primary.main
    }
  },
  toast: {
    borderRadius: theme.spacing(0.75)
  }
}));

const ToastProvider = () => {
  const classes = useStyles();

  return (
    <ToastContainer
      pauseOnFocusLoss={false}
      className={classes.toastContainer}
      toastClassName={classes.toast}
    />
  )
};

export default memo(ToastProvider);