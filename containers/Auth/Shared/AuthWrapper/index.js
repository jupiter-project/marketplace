
import { memo } from 'react'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Logo from 'components/Logo'
import MagicLoading from 'components/MagicLoading'
import { AUTH_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${AUTH_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 544,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(3),
    padding: theme.spacing(4, 8),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2)
    }
  },
  logo: {
    marginBottom: theme.spacing(2)
  },
  welcome: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(4)
  }
}));

const authPageStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginBottom: theme.spacing(2.5)
  },
  button: {
    height: 56,
    margin: theme.spacing(2.5)
  }
}));

const AuthWrapper = ({
  children
}) => {
  const classes = useStyles()
  const { loadingStatus } = useSelector(state => state.loading)

  return (
    <div className={classes.root}>
      {
        loadingStatus &&
        <MagicLoading loading={loadingStatus} />
      }
      <Paper className={classes.container}>
        <Logo className={classes.logo} />
        <Typography
          align='center'
          variant='h6'
          color='primary'
          className={classes.welcome}
        >
          Welcome to Leda!
        </Typography>
        {children}
      </Paper>
    </div>
  )
}

export { authPageStyles };
export default memo(AuthWrapper);