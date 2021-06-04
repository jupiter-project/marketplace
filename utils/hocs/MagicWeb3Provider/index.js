
import { memo } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const MagicWeb3Provider = ({
  children
}) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
};

export default memo(MagicWeb3Provider);
