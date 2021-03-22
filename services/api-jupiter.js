import axios from 'axios'

import { JUPITER_URL, JUPITER_FEE_CALCULATE_URL } from 'config'

const apiAxios = axios.create({
  baseURL: JUPITER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

const getAccountByPassphrase = async (passphrase) => {
  return await apiAxios.get(`/nxt?requestType=getAccountId&secretPhrase=${passphrase}`)
}

const getAccountByAccountID = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const getDGSGoods = async (params, seller = '') => {
  let defaultURL = `/nxt?requestType=getDGSGoods&firstIndex=${params.first}&lastIndex=${params.last}`

  if (!!seller) {
    defaultURL += `&seller=${seller}`
  }

  return await apiAxios.get(defaultURL)
}

const getDGSPurchasesBySeller = async (params) => {
  const defaultURL = `/nxt?requestType=getDGSPurchases&firstIndex=${params.first}&lastIndex=${params.last}&seller=${params.seller}&completed=true`
  return await apiAxios.get(defaultURL)
}

const getDGSPurchasesByBuyer = async (params) => {
  const defaultURL = `/nxt?requestType=getDGSPurchases&firstIndex=${params.first}&lastIndex=${params.last}&buyer=${params.buyer}&completed=true`
  return await apiAxios.get(defaultURL)
}

const getDGSGood = async (goods) => {
  return await apiAxios.get(`/nxt?requestType=getDGSGood&goods=${goods}`)
}

const getDGSPendingPurchases = async (seller) => {
  return await apiAxios.get(`/nxt?requestType=getDGSPendingPurchases&seller=${seller}`)
}

const setAccountInfo = async (params) => {
  const defaultURL = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const createNFTToken = async (params) => {
  const defaultURL = `/nxt?requestType=dgsListing&name=${params.name}&description=${params.description}&tags=${params.tags}&quantity=${params.quantity}&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const purchaseDGSGood = async (params) => {
  const defaultURL = `/nxt?requestType=dgsPurchase&goods=${params.goods}&priceNQT=${params.priceNQT}&quantity=${params.quantity}&deliveryDeadlineTimestamp=${params.deliveryDeadlineTimestamp}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const changeDGSGoodPrice = async (params) => {
  const defaultURL = `/nxt?requestType=dgsPriceChange&goods=${params.goods}&priceNQT=${params.priceNQT}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const changeDGSGoodQuantity = async (params) => {
  const defaultURL = `/nxt?requestType=dgsQuantityChange&goods=${params.goods}&deltaQuantity=${params.quantity}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const deleteNFTToken = async (params) => {
  const defaultURL = `/nxt?requestType=dgsDelisting&goods=${params.goods}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const deliveryDGSGood = async (params, discountNQT) => {
  let defaultURL = `/nxt?requestType=dgsDelivery&purchase=${params.purchase}&goodsToEncrypt=${params.goodsToEncrypt}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;
  if (!!discountNQT) {
    defaultURL += `&discountNQT=${discountNQT}`
  }

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

const refundDGSGood = async (params) => {
  const defaultURL = `/nxt?requestType=dgsRefund&purchase=${params.purchase}&refundNQT=${params.refundNQT}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24`;

  const feeNQTURL = `${defaultURL}${JUPITER_FEE_CALCULATE_URL}`;
  const response = await apiAxios.post(feeNQTURL)

  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  const url = `${defaultURL}&feeNQT=${feeNQT}`;
  return await apiAxios.post(url)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getDGSGoods,
  getDGSGood,
  getDGSPendingPurchases,
  getDGSPurchasesBySeller,
  getDGSPurchasesByBuyer,
  createNFTToken,
  purchaseDGSGood,
  changeDGSGoodPrice,
  changeDGSGoodQuantity,
  deleteNFTToken,
  deliveryDGSGood,
  refundDGSGood
};
