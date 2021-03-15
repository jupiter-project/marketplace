import axios from 'services/axios'

const createNFTtoken = async (params) => {
  return await axios.post('/api/nft-token/create', params);
};

export {
  createNFTtoken,
};
