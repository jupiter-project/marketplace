import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UnsupportedChainIdError } from '@web3-react/core'

import MESSAGES from 'utils/constants/messages'
import { ERC_CHAIN_ID } from 'config'

const injected = new InjectedConnector({
  supportedChainIds: [ERC_CHAIN_ID]
});

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return MESSAGES.CONNECT_NO_ETHEREUM_PROVIDER_ERROR
  } else if (error instanceof UnsupportedChainIdError) {
    return MESSAGES.CONNECT_UNSUPPORTED_CHAIN_ID_ERROR
  } else if (
    error instanceof UserRejectedRequestErrorInjected
  ) {
    return MESSAGES.CONNECT_ACCESS_BINANCE_ERROR
  } else {
    return MESSAGES.CONNECT_UNKNOWN_ERROR
  }
}

export {
  injected,
  getErrorMessage
}