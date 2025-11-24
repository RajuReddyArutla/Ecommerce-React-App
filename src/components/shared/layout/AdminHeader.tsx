
// src/components/shared/layout/AdminHeader.tsx
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { getInitials } from '@/utils/formatters';
import { useState } from 'react';

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  '/admin/dashboard': { title: 'Dashboard', subtitle: 'Overview of your platform' },
  '/admin/products': { title: 'Products', subtitle: 'Manage your product catalog' },
  '/admin/orders': { title: 'Orders', subtitle: 'View and manage orders' },
  '/admin/users': { title: 'Users', subtitle: 'Manage user accounts' },
  '/admin/settings': { title: 'Settings', subtitle: 'Configure your platform' },
};

export default function AdminHeader() {
  const location = useLocation();
  const { user } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

            {/* Admin Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">
                      {user ? getInitials(user.firstName, user.lastName) : 'AD'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-100 lg:hidden">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <a
                    href="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </a>
                  <a
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-100">
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for closing dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
}