// import { useState } from 'react';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import { 
//   Package, 
//   ShoppingCart, 
//   History, 
//   User, 
//   Home,
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';
// import { useAuthStore } from '@/store/authStore';
// import { cn } from '@/utils/cn';
// import ProductsPage from './ProductsPage';
// import CartPage from './cart/CartPage';
// import OrdersPage from './orders/OrdersPage';
// import ProfilePage from './profile/ProfilePage';
// import CheckoutPage from './CheckoutPage';

// const navigation = [
//   { name: 'Dashboard', href: '/customer', icon: Home },
//   { name: 'Products', href: '/customer/products', icon: Package },
//   { name: 'Cart', href: '/customer/cart', icon: ShoppingCart },
//   { name: 'Orders', href: '/customer/orders', icon: History },
//   { name: 'Profile', href: '/customer/profile', icon: User },
// ];

// export default function CustomerDashboard() {
//   const { user, logout } = useAuthStore();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar */}
//       <div className={cn(
//         "lg:hidden fixed inset-0 z-50 bg-gray-900/80 transition-opacity",
//         sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       )}>
//         <div className={cn(
//           "fixed inset-y-0 left-0 w-64 bg-white transform transition-transform",
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         )}>
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-bold text-gray-900">Customer Portal</h1>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//           <nav className="p-4 space-y-2">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={() => setSidebarOpen(false)}
//                   className={cn(
//                     "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
//                     isActive
//                       ? "bg-primary-50 text-primary-700 border-r-2 border-primary-700"
//                       : "text-gray-600 hover:bg-gray-100"
//                   )}
//                 >
//                   <Icon className="w-5 h-5 mr-3" />
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
//         <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
//           <div className="flex h-16 shrink-0 items-center">
//             <h1 className="text-xl font-bold text-gray-900">Customer Portal</h1>
//           </div>
//           <nav className="flex flex-1 flex-col">
//             <ul role="list" className="flex flex-1 flex-col gap-y-7">
//               <li>
//                 <ul role="list" className="-mx-2 space-y-1">
//                   {navigation.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = location.pathname === item.href;
//                     return (
//                       <li key={item.name}>
//                         <Link
//                           to={item.href}
//                           className={cn(
//                             "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors",
//                             isActive
//                               ? "bg-primary-50 text-primary-700"
//                               : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
//                           )}
//                         >
//                           <Icon className="h-6 w-6 shrink-0" />
//                           {item.name}
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </li>
//               <li className="mt-auto">
//                 <button
//                   onClick={handleLogout}
//                   className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-red-600 w-full text-left"
//                 >
//                   <LogOut className="h-6 w-6 shrink-0" />
//                   Sign out
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Header */}
//         <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
//           <button
//             type="button"
//             className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>

//           <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
//             <div className="flex items-center gap-x-4 lg:gap-x-6">
//               <div className="text-sm text-gray-700">
//                 Welcome, <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="py-8">
//           <div className="px-4 sm:px-6 lg:px-8">
//             <Routes>
//               <Route path="/" element={<CustomerHome />} />
//               <Route path="/products" element={<ProductsPage />} />
//               <Route path="/cart" element={<CartPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//               <Route path="/orders" element={<OrdersPage />} />
//               <Route path="/profile" element={<ProfilePage />} />
//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // Customer Home Component
// function CustomerHome() {
//   const { user } = useAuthStore();

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}! 👋</h1>
//         <p className="text-gray-600 mt-2">Here's what's happening with your orders today.</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-blue-100 rounded-lg">
//               <Package className="w-6 h-6 text-blue-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Orders</p>
//               <p className="text-2xl font-semibold text-gray-900">0</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-green-100 rounded-lg">
//               <ShoppingCart className="w-6 h-6 text-green-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Cart Items</p>
//               <p className="text-2xl font-semibold text-gray-900">0</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center">
//             <div className="p-3 bg-purple-100 rounded-lg">
//               <User className="w-6 h-6 text-purple-600" />
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Account Status</p>
//               <p className="text-lg font-semibold text-green-600">Active</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <Link
//             to="/customer/products"
//             className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
//           >
//             <Package className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//             <span className="text-sm font-medium text-gray-700 group-hover:text-primary-900">
//               Browse Products
//             </span>
//           </Link>

//           <Link
//             to="/customer/cart"
//             className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
//           >
//             <ShoppingCart className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//             <span className="text-sm font-medium text-gray-700 group-hover:text-primary-900">
//               View Cart
//             </span>
//           </Link>

//           <Link
//             to="/customer/orders"
//             className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
//           >
//             <History className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//             <span className="text-sm font-medium text-gray-700 group-hover:text-primary-900">
//               Order History
//             </span>
//           </Link>

//           <Link
//             to="/customer/profile"
//             className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors group"
//           >
//             <User className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mb-2" />
//             <span className="text-sm font-medium text-gray-700 group-hover:text-primary-900">
//               Manage Profile
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { orderService } from '../../../services/orderService';
// import { customerService } from '../../../services/customerService';
// import { useAuthStore } from '../../../store/authStore';
import {
  ShoppingBag,
  Package,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
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
    cancelledOrders: 0,
    totalSpent: 0,
    savedAddresses: 0,
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

      // Fetch orders
      const orders = await orderService.getUserOrders(userId);
      
      // Fetch addresses
      const addresses = await customerService.getAddresses(userId);

      // Calculate stats
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

      // Set recent orders (last 5)
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
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <ShoppingBag className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedOrders}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats.totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Saved Addresses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.savedAddresses}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Cancelled Orders */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.cancelledOrders}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/customer/products')}
            className="bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            <ShoppingBag className="w-8 h-8 mb-2" />
            <h3 className="font-semibold text-lg">Browse Products</h3>
            <p className="text-sm text-indigo-100 mt-1">Explore our collection</p>
          </button>

          <button
            onClick={() => navigate('/customer/orders')}
            className="bg-white text-gray-900 p-6 rounded-lg shadow hover:bg-gray-50 transition-colors border-2 border-gray-200"
          >
            <Package className="w-8 h-8 mb-2 text-indigo-600" />
            <h3 className="font-semibold text-lg">My Orders</h3>
            <p className="text-sm text-gray-600 mt-1">Track your orders</p>
          </button>

          <button
            onClick={() => navigate('/customer/profile')}
            className="bg-white text-gray-900 p-6 rounded-lg shadow hover:bg-gray-50 transition-colors border-2 border-gray-200"
          >
            <MapPin className="w-8 h-8 mb-2 text-indigo-600" />
            <h3 className="font-semibold text-lg">Manage Addresses</h3>
            <p className="text-sm text-gray-600 mt-1">Update delivery info</p>
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button
              onClick={() => navigate('/customer/orders')}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
              <button
                onClick={() => navigate('/customer/products')}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Start Shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/customer/orders/${order.id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <span className="font-semibold text-gray-900">
                        Order #{order.id}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="font-semibold text-gray-900">
                      ${Number(order.totalAmount).toFixed(2)}
                    </span>
                  </div>
                  {order.items && order.items.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {order.items.length} item(s) • {order.items[0].productName}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </p>
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