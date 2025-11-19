import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // ✅ FIXED: Check user.role === 'admin' instead of user.isAdmin
  if (requireAdmin && user?.role !== 'admin') {
    // User is authenticated but not an admin - redirect to customer dashboard
    return <Navigate to={ROUTES.CUSTOMER_PRODUCTS} replace />;
  }

  return <>{children}</>;
}