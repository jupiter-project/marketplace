
const MESSAGES = Object.freeze({
  SIGN_IN_SUCCESS: 'Welcome to Leda. You’ve successfully logged in.',
  SIGN_UP_SUCCESS: 'Welcome to Leda. You have registered successfully. To be able to buy or create NFTs you will have to fund your JUP address.',
  AUTH_ERROR: 'Incorrect JUP address, please try again. ',
  AUTH_REQUIRED: 'Please log in first.',
  TERMS_PRIVACY_CHECK: 'Please check Terms of Service and Privacy Policy',
  MAX_UPLOAD_ERROR: 'Please upload a < 50MB file.',
  SET_ACCOUNT_ERROR: 'There was a problem updating your account info. Either your JUP balance is insufficient or you’ve entered an incorrect passphrase.',
  SET_ACCOUNT_SUCCESS: 'Your account info has been updated.',
  IMAGE_NOT_FOUND: 'Please upload your file first.',
  CREATE_NFT_SUCCESS: 'Your NFT has been created.',
  CREATE_NFT_ERROR: 'There is a problem creating your NFT. Please contact support.',
  GET_NFT_ERROR: 'This NFT does not exist, please check your url.',
  PURCHASE_NFT_SUCCESS: 'You’ve successfully bought this NFT.',
  PURCHASE_NFT_ERROR: 'You don\'t have enough JUP to buy this NFT, please fund your account.',
  DELETE_NFT_SUCCESS: 'Your order has been canceled.',
  DELETE_NFT_ERROR: 'There was a problem canceling your order. Please fund your account and try again.',
  PLACE_ASK_ORDER_SUCCESS: 'Your asset is now for sale on the marketplace.',
  PLACE_ASK_ORDER_ERROR: 'Invalid order placement, incorrect quantity.',
});

export default MESSAGES;