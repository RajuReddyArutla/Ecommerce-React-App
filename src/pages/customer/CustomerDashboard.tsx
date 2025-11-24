
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Package,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { orderService } from '@/services/orderService';
import { customerService } from '@/services/customerService';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSpent: number;
  savedAddresses: number;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    savedAddresses: 0,
    cancelledOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = user?.id;
      
      if (!userId) return;

      const orders = await orderService.getUserOrders(userId);
      const addresses = await customerService.getAddresses(userId);

      const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
      const pendingOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length;
      const completedOrders = orders.filter(o => o.status === 'DELIVERED').length;
      const cancelledOrders = orders.filter(o => o.status === 'CANCELLED').length;

      setStats({
        totalOrders: orders.length,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalSpent,
        savedAddresses: addresses.length,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'SHIPPED':
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'SHIPPED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'PROCESSING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome back, {user?.firstName}! 👋
            </h1>
          </div>
          <p className="text-lg text-gray-600">Here's what's happening with your orders today</p>
        </div>

        {/* Stats Grid - Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500 mt-1">All time purchases</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pendingOrders}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-emerald-600">${stats.totalSpent.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">Lifetime value</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Saved Addresses</p>
                <p className="text-3xl font-bold text-blue-600">{stats.savedAddresses}</p>
                <p className="text-xs text-gray-500 mt-1">Delivery locations</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                <p className="text-xs text-gray-500 mt-1">Successfully delivered</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Cancelled Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Cancelled</p>
                <p className="text-3xl font-bold text-red-600">{stats.cancelledOrders}</p>
                <p className="text-xs text-gray-500 mt-1">Returned or cancelled</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl shadow-lg">
                <XCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/customer/products')}
            className="group bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="w-10 h-10" />
              <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-bold text-2xl mb-2">Browse Products</h3>
            <p className="text-indigo-100 opacity-90">Discover our latest collection</p>
          </button>

          <button
            onClick={() => navigate('/customer/orders')}
            className="group bg-white text-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-10 h-10 text-indigo-600" />
              <ArrowRight className="w-6 h-6 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-bold text-2xl mb-2">My Orders</h3>
            <p className="text-gray-600">Track and manage orders</p>
          </button>

          <button
            onClick={() => navigate('/customer/profile')}
            className="group bg-white text-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-10 h-10 text-indigo-600" />
              <ArrowRight className="w-6 h-6 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-bold text-2xl mb-2">My Addresses</h3>
            <p className="text-gray-600">Manage delivery locations</p>
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
              <p className="text-gray-600 mt-1">Your latest purchases</p>
            </div>
            <button
              onClick={() => navigate('/customer/orders')}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold group"
            >
              View All
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <button
                onClick={() => navigate('/customer/products')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-sm transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/customer/orders/${order.id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          Order #{order.id}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {order.items && order.items.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-600">
                        {order.items.length} item(s) • {order.items[0].productName}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                      <ArrowRight className="w-4 h-4 text-gray-400 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;