
// import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth';
// import { authApi } from './api.service';

// export const authService = {
//   async register(data: RegisterData): Promise<AuthResponse> {
//     const response = await authApi.post<AuthResponse>('/register', data);
//     return response.data;
//   },

//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     const response = await authApi.post<AuthResponse>('/login', credentials);
//     return response.data;
//   },

//   // ✅ NEW: Google ID Token Login
//   async googleLogin(idToken: string): Promise<AuthResponse> {
//     const response = await authApi.post<AuthResponse>('/google-login', {
//       idToken,
//     });
//     return response.data;
//   },
// };


// src/services/auth.service.ts
import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData } from '@/types/auth';

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:3001';

console.log('🔧 Auth Service initialized with URL:', AUTH_API_URL);

const authApi = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request interceptor for debugging
authApi.interceptors.request.use(
  (config) => {
    console.log('📤 Auth API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error('❌ Auth request error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor for debugging
authApi.interceptors.response.use(
  (response) => {
    console.log('✅ Auth API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ Auth API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const authService = {
  // ✅ Login with email/password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/login', credentials);
      
      // ✅ Extract token and user from response
      const { accessToken, user } = response.data;
      
      return {
        token: accessToken, // ✅ Backend returns "accessToken"
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: false,
          createdAt: '',
          updatedAt: ''
        },
      };
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // ✅ Google OAuth login
  async googleLogin(idToken: string): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/google-login', { idToken });
      
      // ✅ Extract token and user from response
      const { accessToken, user } = response.data;
      
      return {
        token: accessToken, // ✅ Backend returns "accessToken"
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: false,
          createdAt: '',
          updatedAt: ''
        },
      };
    } catch (error: any) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  // ✅ Register
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await authApi.post('/auth/register', data);
      
      const { accessToken, user } = response.data;
      
      return {
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: false,
          createdAt: '',
          updatedAt: ''
        },
      };
    } catch (error: any) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // ✅ Logout
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await authApi.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw - allow logout to continue even if API fails
    }
  },

  // ✅ Get current user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await authApi.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
};