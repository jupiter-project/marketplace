
import axios from 'services/axios'

const register = async params => {
  return await axios.post('/api/register', params);
};

const login = async params => {
  return await axios.post('/api/login', params);
};

export {
  login,
  register
};
