import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import NotFoundIcon from '@material-ui/icons/NoSim'

const useStyles = makeStyles((theme) => ({
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(10)
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(5)
  },
  icon: {
    fontSize: 200,
    color: theme.palette.text.secondary
  }
}));

const NoNFT = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFound}>
      <Typography
        variant='h4'
        color='textSecondary'
        className={classes.label}
      >
        There is no this kind of NFT token. Please check url.
      </Typography>
      <NotFoundIcon className={classes.icon} />
    </div>
  )
}

export default memo(NoNFT)