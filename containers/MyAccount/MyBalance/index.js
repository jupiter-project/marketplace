
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
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  balance: {
    fontSize: 30,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
}));

const MyBalance = () => {
  const classes = useStyles();
  const { currentUser, accountRS } = useSelector(state => state.auth);

  return (
    <div className={classes.root}>
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        JUP ADDRESS
      </Typography>
      <Typography
        color='primary'
        align='center'
        className={classes.balance}
      >
        {accountRS}
      </Typography>
      <Typography
        color='textPrimary'
        className={classes.title}
      >
        BALANCE
      </Typography>
      <Typography
        color='primary'
        align='center'
        className={classes.balance}
      >
        {parseInt(currentUser?.balanceNQT || 0, 10) / NQT_WEIGHT} JUP
      </Typography>
    </div>
  )
}


export default memo(MyBalance)