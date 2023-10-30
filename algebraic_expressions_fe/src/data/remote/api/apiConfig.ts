import axios from 'axios';

import { handleError } from './utils';
import { AuthStorage } from '../../local/domains/Auth';

// const API_URL = "https://68d8-195-250-67-210.ngrok-free.app"
const API_URL = "http://0.0.0.0:8000"

export const axiosUtility = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

/**
 * Public instance that we use for requesting public resources
 *
 */
export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

axiosPublic.interceptors.response.use(
  response => response,
  async error => {

    const handled = handleError(error);
    console.log('::: catch HTTP error (public) :::', handled);
    return Promise.reject(handled);
  }
);

/**
 * Config for default (private) axios instance
 *
 */
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 15000;
axios.defaults.headers.common = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
/**
 * Request interceptors config.
 * Set Authorization and other header here before request is done
 *
 */
axios.interceptors.request.use(
  async config => {
    const token = await AuthStorage.getAccessToken();


    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/**
 * Response interceptors config.
 * Handle token refresh, response and errors here
 *
 */
axios.interceptors.response.use(
  response => response,
  async error => {
    const failedUrl = error?.response?.config?.url ?? error?.config?.url;
    const handled = handleError(error);
    console.log('::: catch HTTP error :::', handled);
    console.log('::: catch HTTP error (URL) :::', failedUrl);
    return Promise.reject(handled);
  }
);

export const axiosPrivate = axios;
