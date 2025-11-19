
// import { PaginatedResponse } from '@/types/api.types';
// import { adminApi } from './api.service';
// import { User, UserStatistics } from '@/types/user.types';
// import { Order } from '@/types/order.types';
// import { Product } from '@/types/product.types';

// export const adminService = {
//   // Get all users with pagination
//   async getUsers(page = 1, limit = 20): Promise<PaginatedResponse<User>> {
//     console.log('🔄 [AdminService] Fetching users:', { page, limit, baseURL: adminApi.defaults.baseURL });
    
//     try {
//       const response = await adminApi.get<PaginatedResponse<User>>('/admin/users', {
//         params: { page, limit },
//       });
//       console.log('✅ [AdminService] Users response:', response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error('❌ [AdminService] Users error:', {
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//         data: error.response?.data,
//         url: error.config?.url
//       });
//       throw error;
//     }
//   },

//   // Get user statistics
//   async getUserStatistics(): Promise<UserStatistics> {
//     console.log('🔄 [AdminService] Fetching statistics...');
    
//     try {
//       const response = await adminApi.get<UserStatistics>('/admin/users/statistics');
//       console.log('✅ [AdminService] Statistics response:', response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error('❌ [AdminService] Statistics error:', {
//         status: error.response?.status,
//         statusText: error.response?.statusText,
//         data: error.response?.data,
//         url: error.config?.url
//       });
//       throw error;
//     }
//   },

//   // Update user role
//   async updateUserRole(userId: number, role: string): Promise<User> {
//     const response = await adminApi.put<User>(`/admin/users/${userId}/role`, {
//       role,
//     });
//     return response.data;
//   },

//   // Delete user
//   async deleteUser(userId: number): Promise<void> {
//     await adminApi.delete(`/admin/users/${userId}`);
//   },

//   // NEW: Get all products with pagination
//   async getProducts(page = 1, limit = 20): Promise<PaginatedResponse<Product>> {
//     console.log('🔄 [AdminService] Fetching products:', { page, limit });
//     const response = await adminApi.get<PaginatedResponse<Product>>('/admin/products', {
//       params: { page, limit },
//     });
//     console.log('✅ [AdminService] Products response:', response.data);
//     return response.data;
//   },

//   // NEW: Get all orders with pagination
//   async getOrders(page = 1, limit = 20): Promise<PaginatedResponse<Order>> {
//     console.log('🔄 [AdminService] Fetching orders:', { page, limit });
//     const response = await adminApi.get<PaginatedResponse<Order>>('/admin/orders', {
//       params: { page, limit },
//     });
//     console.log('✅ [AdminService] Orders response:', response.data);
//     return response.data;
//   },

// };

// src/services/adminService.ts - COMPLETE VERSION
import axios from 'axios';
import { UserStatistics } from '@/types/user.types';

const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:3002';
const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3006';
const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3007';

console.log('🔧 Admin Service initialized with URLs:', {
  USER_API_URL,
  PRODUCT_API_URL,
  ORDER_API_URL,
});

// ✅ Create separate axios instances for each service
const userApi = axios.create({
  baseURL: USER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const orderApi = axios.create({
  baseURL: ORDER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Add token interceptor to ALL instances
const addAuthInterceptor = (api: any, serviceName: string) => {
  api.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`📤 ${serviceName} API Request:`, {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
      });
      return config;
    },
    (error: any) => {
      console.error(`❌ ${serviceName} Request error:`, error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: any) => {
      console.log(`✅ ${serviceName} API Response:`, {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error: any) => {
      console.error(`❌ ${serviceName} API Error:`, {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );
};

addAuthInterceptor(userApi, 'User');
addAuthInterceptor(productApi, 'Product');
addAuthInterceptor(orderApi, 'Order');

export const adminService = {
  // ==================== USER MANAGEMENT ====================
  
  async getUserStatistics(): Promise<UserStatistics> {
    try {
      console.log('🔄 Calling getUserStatistics API...');
      const response = await userApi.get('/admin/users/statistics');
      
      console.log('✅ Statistics API Response:', response.data);
      
      const data = response.data.data || response.data;
      
      return {
        totalUsers: data.totalUsers || 0,
        adminCount: data.adminCount || 0,
        customerCount: data.customerCount || 0,
        activeUsers: data.activeUsers || 0,
        newUsersThisMonth: data.newUsersThisMonth || 0,
      };
    } catch (error: any) {
      console.error('❌ getUserStatistics error:', error);
      throw error;
    }
  },

  async getAllUsers(page = 1, limit = 10) {
    try {
      const response = await userApi.get('/admin/users', {
        params: { page, limit },
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getAllUsers error:', error);
      throw error;
    }
  },

  async updateUserRole(userId: number, role: 'admin' | 'customer') {
    try {
      const response = await userApi.put(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error('❌ updateUserRole error:', error);
      throw error;
    }
  },

  async deleteUser(userId: number) {
    try {
      const response = await userApi.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ deleteUser error:', error);
      throw error;
    }
  },

  // ==================== PRODUCT MANAGEMENT ====================
  
  async getProducts(page = 1, limit = 10) {
    try {
      console.log('🔄 Calling getProducts API...');
      const response = await productApi.get('/admin/products', {
        params: { page, limit },
      });
      
      console.log('✅ Products API Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getProducts error:', error);
      throw error;
    }
  },

  async getProduct(productId: number) {
    try {
      const response = await productApi.get(`/admin/products/${productId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getProduct error:', error);
      throw error;
    }
  },

  async createProduct(productData: any) {
    try {
      const response = await productApi.post('/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error('❌ createProduct error:', error);
      throw error;
    }
  },

  async updateProduct(productId: number, productData: any) {
    try {
      const response = await productApi.put(`/admin/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('❌ updateProduct error:', error);
      throw error;
    }
  },

  async deleteProduct(productId: number) {
    try {
      const response = await productApi.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('❌ deleteProduct error:', error);
      throw error;
    }
  },

  // ==================== ORDER MANAGEMENT ====================
  
  async getOrders(page = 1, limit = 10, status?: string) {
    try {
      console.log('🔄 Calling getOrders API...');
      const params: any = { page, limit };
      if (status) params.status = status;
      
      const response = await orderApi.get('/admin/orders', { params });
      
      console.log('✅ Orders API Response:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getOrders error:', error);
      throw error;
    }
  },

  async getOrder(orderId: number) {
    try {
      const response = await orderApi.get(`/admin/orders/${orderId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getOrder error:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId: number, status: string) {
    try {
      const response = await orderApi.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('❌ updateOrderStatus error:', error);
      throw error;
    }
  },

  async deleteOrder(orderId: number) {
    try {
      const response = await orderApi.delete(`/admin/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('❌ deleteOrder error:', error);
      throw error;
    }
  },

  // ==================== STATISTICS & ANALYTICS ====================
  
  async getProductStatistics() {
    try {
      const response = await productApi.get('/admin/products/statistics');
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getProductStatistics error:', error);
      throw error;
    }
  },

  async getOrderStatistics() {
    try {
      const response = await orderApi.get('/admin/orders/statistics');
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ getOrderStatistics error:', error);
      throw error;
    }
  },
};