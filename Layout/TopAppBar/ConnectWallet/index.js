import { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from 'components/UI/Buttons/ContainedButton'
import getEllipsis from 'utils/helpers/getEllipsis'

const useStyles = makeStyles((theme) => ({
  account: {
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: theme.spacing(0, 1),
    color: theme.custom.palette.green,
    border: `2px dashed ${theme.custom.palette.green}`,
  },
  connect: {
    margin: theme.spacing(0, 1)
  }
}));

const ConnectWallet = () => {
  const classes = useStyles()
  const isConnected = true;
  const account = 'JUP-939-2k3k-3kko3'

  const walletHandler = () => {
    console.log(walletHandler)
  }

  return (
    isConnected
      ? (
        <Typography
          variant='body2'
          className={classes.account}
          onClick={walletHandler}
        >
          {getEllipsis(account || '')}
        </Typography>
      ) : (
        <ContainedButton
          className={classes.connect}
          onClick={walletHandler}
        >
          Connect
        </ContainedButton>
      )
  );
};

export default memo(ConnectWallet);
