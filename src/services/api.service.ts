// import axios from 'axios';

// // Get API URLs from environment variables
// const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';
// const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:3002';

// // Auth API (Port 3001)
// export const authApi = axios.create({
//   baseURL: AUTH_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Admin API (Port 3002)
// export const adminApi = axios.create({
//   baseURL: USER_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Customer API
// export const customerApi = axios.create({
//   baseURL: USER_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// [authApi, adminApi, customerApi].forEach((api) => {
//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response interceptor for error handling
//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//       }
//       return Promise.reject(error);
//     }
//   );
// });

import axios from 'axios';

// ==================== AUTH API ====================
export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_AUTH_API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
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

// ==================== USER API ====================
export const userApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userApi.interceptors.response.use(
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

// ==================== ADMIN API ====================
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.response.use(
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

// ==================== PRODUCT API ====================
export const productApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

productApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

productApi.interceptors.response.use(
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

// ==================== ORDER API ====================
export const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

orderApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

orderApi.interceptors.response.use(
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