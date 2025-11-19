// // File 48: src/pages/admin/dashboard/DashboardPage.tsx
// import { useEffect, useState } from 'react';
// import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';
// import { adminService } from '@/services/adminService';
// // import type { UserStatistics } from '@/types/user';
// import toast from 'react-hot-toast';
// import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
// import { UserStatistics } from '@/types/user.types';

// interface StatCard {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
//   trend?: string;
//   trendUp?: boolean;
//   color: string;
// }

// export default function DashboardPage() {
//   const [stats, setStats] = useState<UserStatistics | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadStatistics();
//   }, []);

//   const loadStatistics = async () => {
//     try {
//       setLoading(true);
//       const data = await adminService.getUserStatistics();
//       setStats(data);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Failed to load statistics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner fullScreen />;
//   }

//   const statCards: StatCard[] = [
//     {
//       title: 'Total Users',
//       value: stats?.totalUsers || 0,
//       icon: Users,
//       trend: '+12% from last month',
//       trendUp: true,
//       color: 'bg-blue-500',
//     },
//     {
//       title: 'Admin Users',
//       value: stats?.adminCount || 0,
//       icon: Users,
//       color: 'bg-purple-500',
//     },
//     {
//       title: 'Customers',
//       value: stats?.customerCount || 0,
//       icon: Users,
//       trend: `+${stats?.newUsersThisMonth || 0} this month`,
//       trendUp: true,
//       color: 'bg-green-500',
//     },
//     {
//       title: 'Active Users',
//       value: stats?.activeUsers || 0,
//       icon: TrendingUp,
//       color: 'bg-orange-500',
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="text-gray-600 mt-2">
//           Welcome back! Here's what's happening with your platform today.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {statCards.map((card) => (
//           <div
//             key={card.title}
//             className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-600">{card.title}</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                   {card.value.toLocaleString()}
//                 </p>
//                 {card.trend && (
//                   <p
//                     className={`text-sm mt-2 flex items-center ${
//                       card.trendUp ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     <TrendingUp
//                       className={`w-4 h-4 mr-1 ${
//                         card.trendUp ? '' : 'rotate-180'
//                       }`}
//                     />
//                     {card.trend}
//                   </p>
//                 )}
//               </div>
//               <div className={`${card.color} p-3 rounded-lg`}>
//                 <card.icon className="w-6 h-6 text-white" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
//             <Package className="w-8 h-8 text-primary-600 mb-2" />
//             <h3 className="font-semibold text-gray-900">Add Product</h3>
//             <p className="text-sm text-gray-600 mt-1">
//               Add new products to your catalog
//             </p>
//           </button>
          
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
//             <Users className="w-8 h-8 text-primary-600 mb-2" />
//             <h3 className="font-semibold text-gray-900">Manage Users</h3>
//             <p className="text-sm text-gray-600 mt-1">
//               View and manage user accounts
//             </p>
//           </button>
          
//           <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
//             <ShoppingCart className="w-8 h-8 text-primary-600 mb-2" />
//             <h3 className="font-semibold text-gray-900">View Orders</h3>
//             <p className="text-sm text-gray-600 mt-1">
//               Check recent orders and status
//             </p>
//           </button>
//         </div>
//       </div>

//       {/* Recent Activity Placeholder */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
//         <p className="text-gray-600 text-center py-8">
//           Activity tracking will be implemented with order and product APIs
//         </p>
//       </div>
//     </div>
//   );
// }


// File 48: src/pages/admin/dashboard/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { Users, ShoppingCart, Package, TrendingUp } from 'lucide-react';
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
}

export default function DashboardPage() {
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

  if (loading) {
    console.log('⏳ Showing loading spinner...');
    return <LoadingSpinner fullScreen />;
  }

  console.log('🎨 Rendering dashboard with stats:', stats);

  const statCards: StatCard[] = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      trend: '+12% from last month',
      trendUp: true,
      color: 'bg-blue-500',
    },
    {
      title: 'Admin Users',
      value: stats?.adminCount || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Customers',
      value: stats?.customerCount || 0,
      icon: Users,
      trend: `+${stats?.newUsersThisMonth || 0} this month`,
      trendUp: true,
      color: 'bg-green-500',
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {card.value.toLocaleString()}
                </p>
                {card.trend && (
                  <p
                    className={`text-sm mt-2 flex items-center ${
                      card.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 mr-1 ${
                        card.trendUp ? '' : 'rotate-180'
                      }`}
                    />
                    {card.trend}
                  </p>
                )}
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
            <Package className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Add Product</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add new products to your catalog
            </p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
            <Users className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage user accounts
            </p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
            <ShoppingCart className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900">View Orders</h3>
            <p className="text-sm text-gray-600 mt-1">
              Check recent orders and status
            </p>
          </button>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-600 text-center py-8">
          Activity tracking will be implemented with order and product APIs
        </p>
      </div>
    </div>
  );
}

