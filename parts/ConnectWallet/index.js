
import { memo, useContext } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';

import { AccountContext } from 'context/AccountContext'
import OutlinedButton from 'components/UI/Buttons/OutlinedButton'
import useWalletModel from 'utils/hooks/useWalletModel';
import LINKS from 'utils/constants/links'

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(1)
  },
  loading: {
    margin: theme.spacing(0, 2)
  },
  account: {
    cursor: 'pointer',
    borderRadius: 6,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}));

const ConnectWallet = () => {
  const classes = useStyles();
  const router = useRouter();

  const { web3Loading, disconnect, getweb3 } = useWalletModel();
  const { account, onUpdateAccount } = useContext(AccountContext);

  const connectWalletHandler = async () => {
    await getweb3().then((response) => {
      if (!!response) {
        response.eth.getAccounts().then((result) => (
          onUpdateAccount(result[0])
        ));
      }
    });
    router.push(LINKS.DASHBOARD.HREF)
  }

  const disconnectWalletHandler = async () => {
    await disconnect();
    onUpdateAccount('')
    router.push(LINKS.HOME.HREF)
  }

  return (
    web3Loading
      ? (
        <Typography
          variant='h6'
          color='primary'
          className={classes.loading}
        >
          Loadings
        </Typography>
      ) : (
        !!account
          ? (
            <Typography
              variant='caption'
              color='primary'
              className={classes.account}
              onClick={disconnectWalletHandler}
            >
              {account}
            </Typography>
          ) : (
            <OutlinedButton
              className={classes.button}
              onClick={connectWalletHandler}
            >
              Connect Wallet
            </OutlinedButton>
          )
      )
  );
};

export default memo(ConnectWallet);