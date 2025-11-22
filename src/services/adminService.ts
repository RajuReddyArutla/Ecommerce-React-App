
///////////////////imp

import axios from 'axios';

const USER_API_URL = import.meta.env.VITE_USER_API_URL || 'http://localhost:3002';
const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3006';
const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL || 'http://localhost:3007';

console.log('🔧 Admin Service initialized with URLs:', {
  USER_API_URL,
  PRODUCT_API_URL,
  ORDER_API_URL,
});

// Create axios instances
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

// Add token to all requests
[userApi, productApi, orderApi].forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('📤 Admin API Request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
      });
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      console.log('✅ Admin API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error) => {
      console.error('❌ Admin API Error:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
});

// Helper function to extract data from response
const extractData = (response: any) => {
  // Handle different response formats
  if (response.data?.data) {
    // Format: { success: true, data: { data: [...], total: X } }
    return response.data.data;
  } else if (Array.isArray(response.data)) {
    // Format: [...]
    return response.data;
  } else if (response.data) {
    // Format: { data: [...] }
    return response.data;
  }
  return [];
};

export const adminService = {
  // ==================== USERS ====================
  async getUsers(page = 1, limit = 20) {
    console.log('🔄 Calling getUsers API...');
    try {
      // Try /admin/users first
      const response = await userApi.get('/admin/users', { params: { page, limit } });
      const data = extractData(response);
      console.log('✅ Users API Response:', { count: data.length || 0, data });
      return data;
    } catch (error: any) {
      // If that fails, try /users
      if (error.response?.status === 404) {
        console.log('⚠️ /admin/users not found, trying /users...');
        const response = await userApi.get('/users', { params: { page, limit } });
        const data = extractData(response);
        console.log('✅ Users API Response:', { count: data.length || 0, data });
        return data;
      }
      throw error;
    }
  },

  async getUserById(userId: number) {
    try {
      const response = await userApi.get(`/admin/users/${userId}`);
      return extractData(response);
    } catch (error: any) {
      if (error.response?.status === 404) {
        const response = await userApi.get(`/users/${userId}`);
        return extractData(response);
      }
      throw error;
    }
  },

  async createUser(userData: any) {
    try {
      const response = await userApi.post('/admin/users', userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        const response = await userApi.post('/users', userData);
        return response.data;
      }
      throw error;
    }
  },

  async updateUser(userId: number, userData: any) {
    try {
      const response = await userApi.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        const response = await userApi.put(`/users/${userId}`, userData);
        return response.data;
      }
      throw error;
    }
  },

  async deleteUser(userId: number) {
    try {
      const response = await userApi.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        const response = await userApi.delete(`/users/${userId}`);
        return response.data;
      }
      throw error;
    }
  },

  // ==================== PRODUCTS ====================
  async getProducts(page = 1, limit = 20) {
    console.log('🔄 Calling getProducts API...');
    const response = await productApi.get('/products', { params: { page, limit } });
    const data = extractData(response);
    console.log('✅ Products API Response:', { count: data.length || 0, data });
    return data;
  },

  async getProductById(productId: number) {
    const response = await productApi.get(`/products/${productId}`);
    return extractData(response);
  },

  async createProduct(productData: any) {
    console.log('📦 Creating product:', productData);
    const response = await productApi.post('/products', productData);
    console.log('✅ Product created:', response.data);
    return response.data;
  },

  async updateProduct(productId: number, productData: any) {
    console.log('📝 Updating product:', productId, productData);
    try {
      // Try PUT first
      const response = await productApi.put(`/products/${productId}`, productData);
      console.log('✅ Product updated:', response.data);
      return response.data;
    } catch (error: any) {
      // If PUT fails with 404, try PATCH
      if (error.response?.status === 404) {
        console.log('⚠️ PUT failed, trying PATCH...');
        const response = await productApi.patch(`/products/${productId}`, productData);
        console.log('✅ Product updated with PATCH:', response.data);
        return response.data;
      }
      throw error;
    }
  },

  async deleteProduct(productId: number) {
    console.log('🗑️ Deleting product:', productId);
    const response = await productApi.delete(`/products/${productId}`);
    console.log('✅ Product deleted');
    return response.data;
  },

  // ==================== ORDERS ====================
  async getOrders(page = 1, limit = 20) {
    console.log('🔄 Calling getOrders API...');
    const response = await orderApi.get('/orders', { params: { page, limit } });
    const data = extractData(response);
    console.log('✅ Orders API Response:', { count: data.length || 0, data });
    return data;
  },

  async getOrderById(orderId: number) {
    const response = await orderApi.get(`/orders/${orderId}`);
    return extractData(response);
  },

  async updateOrderStatus(orderId: number, status: string) {
    const response = await orderApi.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  async deleteOrder(orderId: number) {
    const response = await orderApi.delete(`/orders/${orderId}`);
    return response.data;
  },

  // ==================== DASHBOARD STATS ====================
  async getDashboardStats() {
    console.log('📊 Fetching dashboard stats...');
    
    try {
      // Fetch all data
      const [users, products, orders] = await Promise.all([
        this.getUsers(1, 1000), // Get all users
        this.getProducts(1, 1000), // Get all products
        this.getOrders(1, 1000), // Get all orders
      ]);

      // Calculate stats
      const totalUsers = Array.isArray(users) ? users.length : 0;
      const adminUsers = Array.isArray(users) ? users.filter((u: any) => u.role === 'admin').length : 0;
      const customers = Array.isArray(users) ? users.filter((u: any) => u.role === 'customer').length : 0;
      const totalProducts = Array.isArray(products) ? products.length : 0;
      const totalOrders = Array.isArray(orders) ? orders.length : 0;
      const totalRevenue = Array.isArray(orders)
        ? orders.reduce((sum: number, order: any) => sum + (Number(order.totalAmount) || 0), 0)
        : 0;

      const stats = {
        totalUsers,
        adminUsers,
        customers,
        activeUsers: 0, // You can calculate based on last login
        totalProducts,
        totalOrders,
        totalRevenue,
      };

      console.log('✅ Dashboard stats:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Failed to fetch dashboard stats:', error);
      return {
        totalUsers: 0,
        adminUsers: 0,
        customers: 0,
        activeUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
      };
    }
  },

  // Alias for backward compatibility
  async getUserStatistics() {
    return this.getDashboardStats();
  },
};