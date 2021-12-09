import axios, { AxiosRequestConfig } from 'axios';

// import * as Session from '../Session';

const baseURL = 'http://localhost:5000';

export const api = axios.create({
  baseURL,
});

// api.interceptors.request.use(config => {
//   const nConfig = { ...config };
//   if (Session.isAuthenticated()) {
//     nConfig.headers.Authorization = Session.getToken();
//   }
//   return nConfig;
// });

// api.interceptors.response.use(
//   response => response,
//   error => {
//     const status = error?.response?.status;
//     if (error && status === 401 && Session.isAuthenticated()) {
//       Session.logout();
//       window.location.href = '/';
//       toast.error(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           'Invalid session',
//       );
//     }
//     return Promise.reject(error);
//   },
// );

export function requestWraper<T>(settings: AxiosRequestConfig) {
  return api.request<T>(settings).then(({ data }) => data);
}