
// src/components/shared/layout/AdminSidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ROUTES } from '@/utils/constants';

// Constants
const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { name: 'Products', href: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { name: 'Orders', href: ROUTES.ADMIN_ORDERS, icon: ShoppingCart },
  { name: 'Users', href: ROUTES.ADMIN_USERS, icon: Users },
  { name: 'Settings', href: ROUTES.ADMIN_SETTINGS, icon: Settings },
] as const;

const SIDEBAR_WIDTH = {
  EXPANDED: 'w-64',
  COLLAPSED: 'lg:w-20',
} as const;

interface AdminSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
}

export default function AdminSidebar({ 
  onCollapseChange, 
  isMobileMenuOpen = false, 
  onMobileMenuToggle 
}: AdminSidebarProps) {
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notify parent about collapse state changes
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  // Event handlers with useCallback
  const handleMobileMenuToggle = useCallback(() => {
    onMobileMenuToggle?.(!isMobileMenuOpen);
  }, [isMobileMenuOpen, onMobileMenuToggle]);

  const handleCollapseToggle = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleNavClick = useCallback(() => {
    if (isMobileMenuOpen) {
      onMobileMenuToggle?.(false);
    }
  }, [isMobileMenuOpen, onMobileMenuToggle]);

  const handleOverlayClick = useCallback(() => {
    onMobileMenuToggle?.(false);
  }, [onMobileMenuToggle]);

  // Navigation item component for better reusability
  const NavigationItem = useCallback(({ item }: { item: typeof NAVIGATION_ITEMS[number] }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <li>
        <Link
          to={item.href}
          onClick={handleNavClick}
          className={cn(
            'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative group',
            isActive
              ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            isCollapsed && 'lg:justify-center lg:px-3'
          )}
          title={isCollapsed ? item.name : ''}
        >
          <item.icon className={cn(
            "w-5 h-5 flex-shrink-0 transition-transform",
            isActive ? "text-primary-600" : "text-gray-500 group-hover:text-gray-700"
          )} />
          
          {(!isCollapsed || isMobileMenuOpen) && (
            <span className="ml-3 whitespace-nowrap">{item.name}</span>
          )}
          
          {isActive && isCollapsed && (
            <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-r" />
          )}
        </Link>
      </li>
    );
  }, [location.pathname, handleNavClick, isCollapsed, isMobileMenuOpen]);

  return (
    <>
      {/* Mobile menu button - Only show when sidebar is closed */}
      {!isMobileMenuOpen && (
        <button
          onClick={handleMobileMenuToggle}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-md transition-shadow"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-700" aria-hidden="true" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? SIDEBAR_WIDTH.COLLAPSED : SIDEBAR_WIDTH.EXPANDED
        )}
        aria-label="Admin navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo & Header Section */}
          <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
            <div className={cn(
              'flex items-center gap-3 transition-all duration-300',
              isCollapsed && 'lg:justify-center lg:w-full'
            )}>
              {/* Enhanced Logo */}
              <div 
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                aria-hidden="true"
              >
                <div className="text-white font-bold text-lg tracking-tight">EM</div>
              </div>
              
              {/* Logo Text */}
              {(!isCollapsed || isMobileMenuOpen) && (
                <div className="flex flex-col leading-tight">
                  <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                    E-Mart
                  </h1>
                  <span className="text-xs text-gray-500 whitespace-nowrap mt-[-2px]">
                    Admin Panel
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Toggle Button */}
            {!isMobileMenuOpen && (
              <button
                onClick={handleCollapseToggle}
                className={cn(
                  'hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  isCollapsed && 'absolute top-6 right-2'
                )}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-600" aria-hidden="true" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-600" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Mobile Close Button - Inside sidebar when open */}
            {isMobileMenuOpen && (
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ml-auto"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3" aria-label="Main navigation">
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationItem key={item.href} item={item} />
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={cn(
                'flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                isCollapsed && 'lg:justify-center lg:px-3'
              )}
              title={isCollapsed ? 'Logout' : ''}
              aria-label="Logout"
            >
              <LogOut className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                "text-gray-500 group-hover:text-red-600"
              )} aria-hidden="true" />
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="ml-3 whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
    </>
  );
}