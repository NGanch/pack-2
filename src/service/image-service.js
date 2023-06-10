import axios from 'axios';

const API_KEY = 'Q9ZoD4Q4JNIbvGfXwX1BkTswyncteF5BPGfujMsPal2F4c9p0lQYd0Xj';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  return await axios.get(`search?query=${query}&page=${page}`);
};
