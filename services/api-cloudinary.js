import axios from 'services/axios'

const uploadFileCloudinary = async (params) => {
  return await axios.post('/api/cloudinary/upload', params);
};

export {
  uploadFileCloudinary,
};
