
// File: src/pages/admin/dashboard/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  ShoppingBag,
  UserPlus,
  Activity,
  Package,
  ShoppingCart
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { UserStatistics } from '@/types/user.types';

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  color: string;
  bgColor: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 DashboardPage useEffect triggered');
    console.log('📍 Current path:', window.location.pathname);
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    console.log('🔄 loadStatistics function called');
    try {
      setLoading(true);
      console.log('📡 Making API call to adminService.getUserStatistics()');
      console.log('🔑 Token:', localStorage.getItem('token'));
      console.log('👤 User:', localStorage.getItem('user'));
      
      const data = await adminService.getUserStatistics();
      console.log('✅ API Response received:', data);
      setStats(data);
    } catch (error: any) {
      console.error('❌ API Error:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          method: error.config?.method
        }
      });
      toast.error(error.response?.data?.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
      console.log('🏁 Loading completed');
    }
  };

  // Test API service directly on component mount
  useEffect(() => {
    // Test if adminService is accessible
    console.log('🔍 Testing adminService accessibility:', adminService);
    
    // Test API base URL
    console.log('🌐 Testing environment variables:', {
      VITE_USER_API_URL: import.meta.env.VITE_USER_API_URL,
      VITE_AUTH_API_URL: import.meta.env.VITE_AUTH_API_URL
    });
  }, []);

  // Navigation handlers
  const handleAddProduct = () => {
    navigate('/admin/products');
  };

  const handleManageUsers = () => {
    navigate('/admin/users');
  };

  const handleViewOrders = () => {
    navigate('/admin/orders');
  };

  if (loading) {
    console.log('⏳ Showing loading spinner...');
    return <LoadingSpinner fullScreen />;
  }

  console.log('🎨 Rendering dashboard with stats:', stats);

  // Calculate dynamic percentages
  const calculatePercentage = (part: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  const statCards: StatCard[] = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      trend: stats?.newUsersThisMonth ? `+${stats.newUsersThisMonth} this month` : undefined,
      trendUp: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Admin Users',
      value: stats?.adminCount || 0,
      icon: UserPlus,
      trend: stats?.totalUsers ? `${calculatePercentage(stats.adminCount || 0, stats.totalUsers)}% of total` : undefined,
      trendUp: true,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Customers',
      value: stats?.customerCount || 0,
      icon: ShoppingBag,
      trend: stats?.totalUsers ? `${calculatePercentage(stats.customerCount || 0, stats.totalUsers)}% of total` : undefined,
      trendUp: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: Activity,
      trend: stats?.totalUsers ? `${calculatePercentage(stats.activeUsers || 0, stats.totalUsers)}% active` : undefined,
      trendUp: true,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        {/* <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div> */}

        {/* Stats Grid - All data from backend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">
                    {card.title}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {typeof card.value === 'number' 
                      ? card.value.toLocaleString() 
                      : card.value}
                  </h3>
                  {card.trend && (
                    <div className="flex items-center mt-2">
                      {card.trendUp ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          card.trendUp ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {card.trend}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`${card.bgColor} p-2.5 sm:p-3 rounded-lg`}>
                  <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <button 
              onClick={handleAddProduct}
              className="group p-4 sm:p-5 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-indigo-100 group-hover:bg-indigo-200 p-2.5 rounded-lg transition-colors">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                Add Product
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Add new products to your catalog
              </p>
            </button>
            
            <button 
              onClick={handleManageUsers}
              className="group p-4 sm:p-5 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-green-100 group-hover:bg-green-200 p-2.5 rounded-lg transition-colors">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                Manage Users
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                View and manage user accounts
              </p>
            </button>
            
            <button 
              onClick={handleViewOrders}
              className="group p-4 sm:p-5 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-orange-100 group-hover:bg-orange-200 p-2.5 rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                View Orders
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Check recent orders and status
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              View all
            </button>
          </div>
          
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4">
              <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Activity tracking will be implemented with order and product APIs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}