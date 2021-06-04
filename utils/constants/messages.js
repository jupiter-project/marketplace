
const MESSAGES = Object.freeze({
  CONNECT_NO_ETHEREUM_PROVIDER_ERROR: 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.',
  CONNECT_UNSUPPORTED_CHAIN_ID_ERROR: 'You\'re connected to an unsupported network.',
  CONNECT_ACCESS_BINANCE_ERROR: 'Please authorize this website to access your Binance Smart Chain account.',
  CONNECT_UNKNOWN_ERROR: 'An unknown error occurred. Check the console for more details.',
  SIGN_IN_SUCCESS: 'Welcome to Leda. You’ve successfully logged in.',
  SIGN_UP_SUCCESS: 'Welcome to Leda. You have registered successfully. To be able to buy or create NFTs you will have to fund your JUP address.',
  AUTH_ERROR: 'Incorrect JUP address, please try again. ',
  AUTH_REQUIRED: 'Please log in first.',
  TERMS_PRIVACY_CHECK: 'Please check the Terms of Service and Privacy Policy box.',
  MAX_UPLOAD_ERROR: 'There was a problem uploading your file. Please make sure it is a supported file type of less than 20 MB.',
  SET_ACCOUNT_ERROR: 'There was a problem updating your account info. Either your JUP balance is insufficient or you’ve entered an incorrect passphrase.',
  SET_ACCOUNT_SUCCESS: 'Your updated account info has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  IMAGE_NOT_FOUND: 'Please upload your file first.',
  CREATE_NFT_SUCCESS: 'Your NFT has been created.Your NFT creation is successfully submitted to the blockchain. After ~60 seconds it will appear in your MY NFTS tab. From there, you can put it for sale on the marketplace.',
  CREATE_NFT_ERROR: 'There was a problem creating your NFT. Either your JUP balance is insufficient or you’ve entered an incorrect passphrase.',
  GET_NFT_ERROR: 'This NFT does not exist, please check your url.',
  PURCHASE_NFT_SUCCESS: 'Your buy order has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  PURCHASE_NFT_ERROR: 'You don\'t have enough JUP to buy this NFT, please fund your account.',
  BID_NFT_SUCCESS: 'Your bid has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  BID_NFT_ERROR: 'You don\'t have enough JUP to place this bid, please lower your bid price or fund your account.',
  DELETE_NFT_SUCCESS: 'Your order cancellation has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  DELETE_NFT_ERROR: 'Incorrect passphrase, please try again.',
  PLACE_ASK_ORDER_SUCCESS: 'Your sell order has been submitted to the blockchain and will be confirmed in ~60 seconds.',
  PLACE_ASK_ORDER_ERROR: 'Incorrect passphrase, please try again.',
});

export default MESSAGES;