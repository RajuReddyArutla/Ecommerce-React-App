

import axios from 'axios';

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';
const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:3002';
const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3006';
const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3007';

// Auth API
export const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Admin API (User Service)
export const adminApi = axios.create({
  baseURL: USER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Customer API (User Service)
export const customerApi = axios.create({
  baseURL: USER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Product API
export const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Order API
export const orderApi = axios.create({
  baseURL: ORDER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to all requests
[authApi, adminApi, customerApi, productApi, orderApi].forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
});