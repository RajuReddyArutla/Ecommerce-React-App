// cat > src/hooks/useAuth.ts << 'EOF'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/utils/constants';

interface UseAuthOptions {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const navigate = useNavigate();
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setIsLoading(false);

    if (options.requireAuth && !isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }

    if (options.requireAdmin && user?.role !== 'admin') {
      navigate(ROUTES.CUSTOMER_PRODUCTS);
    }
  }, [isAuthenticated, user, options.requireAuth, options.requireAdmin, navigate, checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
}
