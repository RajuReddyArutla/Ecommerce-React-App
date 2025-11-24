

// src/components/shared/layout/AdminLayout.tsx
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useState, useCallback } from 'react';

export default function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCollapseChange = useCallback((collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  }, []);

  const handleMobileMenuToggle = useCallback((open: boolean) => {
    setIsMobileMenuOpen(open);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar 
        onCollapseChange={handleCollapseChange}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      
      {/* Main content area */}
      <div className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        ${isMobileMenuOpen ? 'translate-x-64' : 'translate-x-0 lg:translate-x-0'}
      `}>
        <AdminHeader />
        <main className="flex-1 py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => handleMobileMenuToggle(false)}
        />
      )}
    </div>
  );
}