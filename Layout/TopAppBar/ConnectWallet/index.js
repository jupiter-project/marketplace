import { memo, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { injected } from 'libs/web3-connectors'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import useEagerConnect from 'utils/hooks/useEagerConnect'
import useInactiveListener from 'utils/hooks/useInactiveListener'
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
  const [activatingConnector, setActivatingConnector] = useState();

  const {
    account,
    connector,
    activate,
    deactivate,
    active,
    error
  } = useWeb3React();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const walletHandler = () => {
    if ((active || error)) {
      deactivate();
      return
    }
    setActivatingConnector(injected);
    activate(injected);
  }

  return (
    (active || error)
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
