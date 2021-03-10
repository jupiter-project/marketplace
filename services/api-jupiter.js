import axios from 'services/axios'

const getAccountByPassphrase = async (passphrase) => {
  return await axios.get(`/nxt?requestType=getAccountId&secretPhrase=${passphrase}`)
}

const getAccountByAccountID = async (account) => {
  return await axios.get(`/nxt?requestType=getAccount&account=${account}`)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID
};
