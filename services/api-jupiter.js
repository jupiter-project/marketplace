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

const setAccountInfo = async (params) => {
  return await apiAxios.post(`/nxt?requestType=setAccountInfo`, params)
}

export {
  getAccountByPassphrase,
  getAccountByAccountID,
  setAccountInfo
};
