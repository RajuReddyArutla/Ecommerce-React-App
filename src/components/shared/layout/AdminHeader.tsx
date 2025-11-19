// src/components/shared/layout/AdminHeader.tsx
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  '/admin/dashboard': { title: 'Dashboard', subtitle: 'Overview of your platform' },
  '/admin/products': { title: 'Products', subtitle: 'Manage your product catalog' },
  '/admin/orders': { title: 'Orders', subtitle: 'View and manage orders' },
  '/admin/users': { title: 'Users', subtitle: 'Manage user accounts' },
  '/admin/settings': { title: 'Settings', subtitle: 'Configure your platform' },
};

export default function AdminHeader() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: 'Admin', subtitle: '' };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pageInfo.title}</h1>
            {pageInfo.subtitle && (
              <p className="text-sm text-gray-600 mt-1">{pageInfo.subtitle}</p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}