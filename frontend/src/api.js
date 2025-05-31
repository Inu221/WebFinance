import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAssets = (search = '') => {
  return axios.get(`${API_BASE_URL}/assets`, {
    params: { search }
  });
};
