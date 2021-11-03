import { memo, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import * as europaAPI from 'services/europa'
import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import useAuth from 'utils/hooks/useAuth'
import usePopUp from 'utils/hooks/usePopUp'
import MESSAGES from 'utils/constants/messages'

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
  const { accountRS, logOutHandler, setLoginToken } = useAuth();
  const { setPopUp } = usePopUp();

  const [loading, setLoading] = useState(false);

  const walletHandler = async () => {
    if (!!accountRS) {
      logOutHandler()
      return
    }

    setLoading(true);
    try {
      const accountRS = await europaAPI.connectWallet()
      const response = await jupiterAPI.getAccountByAccountID(accountRS);
      if (!response?.accountRS) {
        setPopUp({ text: MESSAGES.CONNECT_WALLET_ERROR })
        setLoading(false);
        return;
      }

      setLoginToken({
        accountRS: response.accountRS,
        user: response,
        isWallet: true
      });
    } catch (error) {
      console.log(error)
      setPopUp({ text: MESSAGES.CONNECT_WALLET_ERROR })
    }
    setLoading(false);
  }

  return (
    !!accountRS
      ? (
        <Typography
          variant='body2'
          className={classes.account}
          onClick={walletHandler}
        >
          {accountRS || ''}
        </Typography>
      ) : (
        <ContainedButton
          disabled={loading}
          className={classes.connect}
          onClick={walletHandler}
        >
          Connect
        </ContainedButton>
      )
  );
};

export default memo(ConnectWallet);
