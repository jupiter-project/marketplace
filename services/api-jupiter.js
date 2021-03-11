import axios from 'services/axios'

const getAccountByPassphrase = async (passphrase) => {
  return await axios.get(`/nxt?requestType=getAccountId&secretPhrase=${passphrase}`)
}

const getAccountByAccountID = async (account) => {
  return await axios.get(`/nxt?requestType=getAccount&account=${account}`)
}

const setAccountInfo = async (params) => {
  return await axios.post(`/nxt?requestType=setAccountInfo`, params)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo
};
