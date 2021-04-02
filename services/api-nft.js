
import axios from 'services/axios'

const addNFT = async (params) => {
  return await axios.post('/api/nfts', params);
};

export {
  addNFT,
};
