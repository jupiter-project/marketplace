
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  balance: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1)
  },
}));

const MyBalance = () => {
  const classes = useStyles();
  const { currentUser } = useSelector(state => state.auth);

  return (
    <div className={classes.root}>
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        BALANCE
      </Typography>
      <Typography
        color='primary'
        className={classes.balance}
      >
        {parseInt(currentUser?.balanceNQT || 0, 10) / NQT_WEIGHT} JUP
      </Typography>
    </div>
  )
}


export default memo(MyBalance)