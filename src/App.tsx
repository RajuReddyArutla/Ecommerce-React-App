import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import './index.css';

// Layouts
import AdminLayout from '@/components/shared/layout/AdminLayout';
import CustomerLayout from '@/components/shared/layout/CustomerLayout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Admin Pages
import AdminDashboard from '@/pages/admin/dashboard/DashboardPage';
import AdminProducts from '@/pages/admin/products/ProductsPage';
import AdminOrders from '@/pages/admin/orders/OrdersPage';
import AdminUsers from '@/pages/admin/users/UsersPage';
import AdminSettings from '@/pages/admin/settings/SettingsPage';

// Customer Pages
import CustomerProducts from '@/pages/customer/products/ProductsPage';
import CustomerCart from '@/pages/customer/cart/CartPage';
import CustomerCheckout from '@/pages/customer/checkout/CheckoutPage';
import CustomerOrders from '@/pages/customer/orders/OrdersPage';
import CustomerProfile from '@/pages/customer/profile/ProfilePage';

// Components
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { ROUTES } from '@/utils/constants';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // ✅ FIXED: Check user.role instead of user.isAdmin
  const getInitialRoute = () => {
    if (!isAuthenticated) return ROUTES.LOGIN;
    return user?.role === 'admin' ? '/admin/dashboard' : '/customer/products';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Root - Redirect based on auth */}
        <Route path="/" element={<Navigate to={getInitialRoute()} replace />} />

        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<CustomerProducts />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="checkout" element={<CustomerCheckout />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;