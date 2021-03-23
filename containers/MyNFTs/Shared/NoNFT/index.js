import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 200
  },
  label: {
    fontWeight: 'bold'
  }
}));

const NoNFT = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant='h3'
        color='textSecondary'
        align='center'
        className={classes.label}
      >
        NO NFT
      </Typography>
    </div>
  )
}

export default memo(NoNFT)