import axios from 'axios';
import Cookies from 'js-cookie';

export const apiAuth = axios.create({
  baseURL: 'http://localhost:4000/api/auth',
  withCredentials: true,
});

apiAuth.interceptors.request.use((req) => {
  const token = Cookies.get('Token');

  req.headers.Authorization = token;

  return req;
});
