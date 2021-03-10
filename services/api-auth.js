import axios from 'services/axios'

const createPassphrase = async () => {
  return await axios.get('/api/create/passphrase');
};

const createJupiterAccount = async (params) => {
  return await axios.post('/api/create/jupiter-account', params);
};

const getJupiterAccount = async (params) => {
  return await axios.post('/api/get/jupiter-account', params);
};

export {
  createPassphrase,
  createJupiterAccount,
  getJupiterAccount
};
