export const API_BASE_URL = {
  AUTH: 'http://localhost:3001',
  ADMIN: 'http://localhost:3002',
  CUSTOMER: 'http://localhost:3003', // You'll provide later
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Customer routes
  CUSTOMER_PRODUCTS: '/customer/products',
  CUSTOMER_CART: '/customer/cart',
  CUSTOMER_CHECKOUT: '/customer/checkout',
  CUSTOMER_ORDERS: '/customer/orders',
  CUSTOMER_PROFILE: '/customer/profile',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 50, 100],
};

export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
} as const;