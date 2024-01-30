import axios from 'axios';
import { logout, refreshAccessToken } from '../../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

let store
export const injectStore = _store => {
  store = _store
}

export const axiosPrivate = axios.create({});

axiosPrivate.interceptors.request.use(async (config) => {

  // refresh token ketika accessToken tidak tersedia dalam state
  if (store.getState().auth.accessToken === "") {
    await store.dispatch(refreshAccessToken())
  }

  const accessToken = store.getState().auth.accessToken
  
  const decoded = jwtDecode(accessToken)

  const currentDate = new Date();

  if (decoded.exp * 1000 < currentDate.getTime()) {
    try {
      await store.dispatch(refreshAccessToken());
      const { accessToken: newToken } = store.getState().auth;

      config.headers.Authorization = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Refresh Token Failed:', error);
      await store.dispatch(logout());
    }
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
})
