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

const getAccount = async (account) => {
  return await apiAxios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const getTransaction = async (transaction) => {
  return await apiAxios.get(`/nxt?requestType=getTransaction&transaction=${transaction}`)
}

const setAccountInfo = async (params) => {
  const url = `/nxt?requestType=setAccountInfo&name=${params.name}&description=${params.description}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const issueAsset = async (params) => {
  const url = `/nxt?requestType=issueAsset&name=${params.name}&description=${params.description}&quantityQNT=${params.quantity}&message=${params.message}&decimals=0&priceNQT=${params.price}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const getIssueAssetFee = async (params) => {
  const url = `/nxt?requestType=issueAsset&name=${params.name}&description=${params.description}&quantityQNT=${params.quantity}&message=${params.message}&decimals=0&priceNQT=${params.price}&publicKey=${params.publicKey}&deadline=24&feeNQT=0&broadcast=false&calculateFee=true`;
  const response = await apiAxios.post(url)
  const { transactionJSON: { feeNQT = 0 } = {} } = response;
  return feeNQT
}

const searchAssets = async (params) => {
  const url = `/nxt?requestType=searchAssets&query=${'nftleda ' + params?.query || ''}&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const searchAccountAssets = async (params) => {
  const url = `/nxt?requestType=searchAccountAssets&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}&account=${params.account}`
  return await apiAxios.get(url)
}

const getAssetsByIssuer = async (params) => {
  const url = `/nxt?requestType=getAssetsByIssuer&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}&account=${params.account}&includeNTFInfo=true`
  return await apiAxios.get(url)
}

const searchAllOpenAskOrders = async (params) => {
  const url = `/nxt?requestType=searchAllOpenAskOrders&query=${`nftleda ${params?.query || ''}`}&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const placeAskOrder = async (params) => {
  const url = `/nxt?requestType=placeAskOrder&asset=${params.asset}&quantityQNT=${params.quantity}&priceNQT=${params.price}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const placeBidOrder = async (params) => {
  const url = `/nxt?requestType=placeBidOrder&asset=${params.asset}&quantityQNT=${params.quantity}&priceNQT=${params.price}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
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
  const url = `/nxt?requestType=cancelAskOrder&order=${params.order}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const cancelBidOrder = async (params) => {
  const url = `/nxt?requestType=cancelBidOrder&order=${params.order}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const deleteAssetShares = async (params) => {
  const url = `/nxt?requestType=deleteAssetShares&asset=${params.asset}&publicKey=${params.publicKey}&quantityQNT=1&deadline=24&feeNQT=0`;
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

const getTrades = async (asset) => {
  const url = `/nxt?requestType=getTrades&asset=${asset}`
  return await apiAxios.get(url)
}

const searchAllTrades = async (params) => {
  const url = `/nxt?requestType=searchAllTrades&query=nftleda&firstIndex=${params.first}&lastIndex=${params.last}`
  return await apiAxios.get(url)
}

const getAssetAccounts = async (asset) => {
  const url = `/nxt?requestType=getAssetAccounts&asset=${asset}`
  return await apiAxios.get(url)
}

const transferAsset = async (params) => {
  const url = `/nxt?requestType=transferAsset&recipient=${params.receiver}&asset=${params.asset}&quantityQNT=${params.amount}&publicKey=${params.publicKey}&deadline=24&feeNQT=0`;
  return await apiAxios.post(url)
}

const broadcastTransaction = async (transactionBytes) => {
  const url = `/nxt?requestType=broadcastTransaction&transactionBytes=${transactionBytes}`;
  return await apiAxios.post(url)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo,
  getAccount,
  getTransaction,
  issueAsset,
  getIssueAssetFee,
  searchAssets,
  searchAccountAssets,
  getAssetsByIssuer,
  searchAllOpenAskOrders,
  placeAskOrder,
  placeBidOrder,
  getAsset,
  getAskOrder,
  getAccountCurrentAskOrders,
  getAccountCurrentBidOrders,
  cancelAskOrder,
  cancelBidOrder,
  deleteAssetShares,
  getAskOrders,
  getBidOrders,
  getTrades,
  searchAllTrades,
  getAssetAccounts,
  transferAsset,
  broadcastTransaction
};
