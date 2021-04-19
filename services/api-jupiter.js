import axios from 'axios'

import { JUPITER_URL } from 'config'

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

const getAllTags = async () => {
  return await apiAxios.get(`/nxt?requestType=getDGSTags`)
}

const getTags = async (params) => {
  return await apiAxios.get(`/nxt?requestType=getDGSTags&firstIndex=${params.first}&lastIndex=${params.last}`)
}

const getDGSGoodsCount = async () => {
  return await apiAxios.get(`/nxt?requestType=getDGSGoodsCount`)
}

const getDGSTagCount = async () => {
  return await apiAxios.get(`/nxt?requestType=getDGSTagCount`)
}

const getDGSPurchaseCount = async () => {
  return await apiAxios.get(`/nxt?requestType=getDGSPurchaseCount`)
}

const getDGSGoods = async (params, seller = '') => {
  let url = `/nxt?requestType=getDGSGoods&firstIndex=${params.first}&lastIndex=${params.last}&inStockOnly=false`

  if (!!seller) {
    url += `&seller=${seller}`
  }

  return await apiAxios.get(url)
}

const searchDGSGoods = async (params) => {
  const url = `/nxt?requestType=searchDGSGoods&query=${params?.query || ''}&tag=${params?.tag || 'nft'}&inStockOnly=${params?.inStockOnly || true}&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const getDGSPurchasesBySeller = async (params) => {
  const url = `/nxt?requestType=getDGSPurchases&firstIndex=${params.first}&lastIndex=${params.last}&seller=${params.seller}&completed=true`
  return await apiAxios.get(url)
}

const getDGSPurchasesByBuyer = async (params) => {
  const url = `/nxt?requestType=getDGSPurchases&firstIndex=${params.first}&lastIndex=${params.last}&buyer=${params.buyer}&completed=true`
  return await apiAxios.get(url)
}

const getAllDGSPurchases = async (params) => {
  const url = `/nxt?requestType=getDGSPurchases&firstIndex=${params.first}&lastIndex=${params.last}&completed=true`
  return await apiAxios.get(url)
}

const getDGSGood = async (goods) => {
  return await apiAxios.get(`/nxt?requestType=getDGSGood&goods=${goods}`)
}

const getDGSPendingPurchases = async (seller) => {
  return await apiAxios.get(`/nxt?requestType=getDGSPendingPurchases&seller=${seller}`)
}

const setAccountInfo = async (params) => {
  const url = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const createNFTToken = async (params) => {
  const url = `/nxt?requestType=dgsListing&name=${params.name}&description=${params.description}&tags=${params.tags}&quantity=${params.quantity}&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const purchaseDGSGood = async (params) => {
  const url = `/nxt?requestType=dgsPurchase&goods=${params.goods}&priceNQT=${params.priceNQT}&quantity=${params.quantity}&deliveryDeadlineTimestamp=${params.deliveryDeadlineTimestamp}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const changeDGSGoodPrice = async (params) => {
  const url = `/nxt?requestType=dgsPriceChange&goods=${params.goods}&priceNQT=${params.priceNQT}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const changeDGSGoodQuantity = async (params) => {
  const url = `/nxt?requestType=dgsQuantityChange&goods=${params.goods}&deltaQuantity=${params.quantity}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const deleteNFTToken = async (params) => {
  const url = `/nxt?requestType=dgsDelisting&goods=${params.goods}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const deliveryDGSGood = async (params, discountNQT) => {
  let url = `/nxt?requestType=dgsDelivery&purchase=${params.purchase}&goodsToEncrypt=${params.goodsToEncrypt}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  if (!!discountNQT) {
    url += `&discountNQT=${discountNQT}`
  }

  return await apiAxios.post(url)
}

const refundDGSGood = async (params) => {
  const url = `/nxt?requestType=dgsRefund&purchase=${params.purchase}&refundNQT=${params.refundNQT}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

// Assets API
const issueAsset = async (params) => {
  const url = `/nxt?requestType=issueAsset&name=${params.name}&description=${params.description}&quantityQNT=${params.quantity}&message=${params.message}&decimals=0&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const searchAssets = async (params) => {
  const url = `/nxt?requestType=searchAssets&query=${'nftleda ' + params?.query || ''}&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const getAssetsByIssuer = async (params) => {
  const url = `/nxt?requestType=getAssetsByIssuer&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}&account=${params.account}&includeNTFInfo=true`
  return await apiAxios.get(url)
}

const getTransaction = async (transaction) => {
  const url = `/nxt?requestType=getTransaction&transaction=${transaction}`
  return await apiAxios.get(url)
}

const searchAllOpenAskOrders = async (params) => {
  const url = `/nxt?requestType=searchAllOpenAskOrders&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const placeAskOrder = async (params) => {
  const url = `/nxt?requestType=placeAskOrder&asset=${params.asset}&quantityQNT=${params.quantity}&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const placeBidOrder = async (params) => {
  const url = `/nxt?requestType=placeBidOrder&asset=${params.asset}&quantityQNT=${params.quantity}&priceNQT=${params.price}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const getAsset = async (asset) => {
  const url = `/nxt?requestType=getAsset&asset=${asset}`
  return await apiAxios.get(url)
}

const getAskOrder = async (order) => {
  const url = `/nxt?requestType=getAskOrder&order=${order}&includeNTFInfo=true`
  return await apiAxios.get(url)
}

const getAccountCurrentAskOrders = async (params) => {
  const url = `/nxt?requestType=getAccountCurrentAskOrders&account=${params.account}&firstIndex=${params.first}&lastIndex=${params.last}&includeNTFInfo=true`
  return await apiAxios.get(url)
}

const getAccountCurrentBidOrders = async (params) => {
  const url = `/nxt?requestType=getAccountCurrentBidOrders&account=${params.account}&firstIndex=${params.first}&lastIndex=${params.last}&includeNTFInfo=true`
  return await apiAxios.get(url)
}

const cancelAskOrder = async (params) => {
  const url = `/nxt?requestType=cancelAskOrder&order=${params.order}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const cancelBidOrder = async (params) => {
  const url = `/nxt?requestType=cancelBidOrder&order=${params.order}&secretPhrase=${params.secretPhrase}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const getAskOrders = async (asset) => {
  const url = `/nxt?requestType=getAskOrders&asset=${asset}`
  return await apiAxios.get(url)
}

const getBidOrders = async (asset) => {
  const url = `/nxt?requestType=getBidOrders&asset=${asset}`
  return await apiAxios.get(url)
}

const searchAllTrades = async (params) => {
  const url = `/nxt?requestType=searchAllTrades&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getAllTags,
  getTags,
  getDGSGoodsCount,
  getDGSTagCount,
  getDGSPurchaseCount,
  searchDGSGoods,
  getDGSGoods,
  getDGSGood,
  getDGSPendingPurchases,
  getDGSPurchasesBySeller,
  getDGSPurchasesByBuyer,
  getAllDGSPurchases,
  createNFTToken,
  purchaseDGSGood,
  changeDGSGoodPrice,
  changeDGSGoodQuantity,
  deleteNFTToken,
  deliveryDGSGood,
  refundDGSGood,

  issueAsset,
  searchAssets,
  getAssetsByIssuer,
  getTransaction,
  searchAllOpenAskOrders,
  placeAskOrder,
  placeBidOrder,
  getAsset,
  getAskOrder,
  getAccountCurrentAskOrders,
  getAccountCurrentBidOrders,
  cancelAskOrder,
  cancelBidOrder,
  getAskOrders,
  getBidOrders,
  searchAllTrades
};
