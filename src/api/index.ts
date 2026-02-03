import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/',
  headers: {},
});

instance.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);

export { instance };
