import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const PublicHeader: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            PE-commerce
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              HOME
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              ABOUT
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
              PRODUCTS
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
              TERMS
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
              PRIVACY
            </Link>
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link 
                to={`/${user?.role}/dashboard`} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;