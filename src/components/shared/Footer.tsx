import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors flex items-center space-x-2"
          >
            <span className="text-xl">📷</span>
            <span>Instagram</span>
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center space-x-2"
          >
            <span className="text-xl">👥</span>
            <span>Facebook</span>
          </a>
          <a 
            href="https://wa.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors flex items-center space-x-2"
          >
            <span className="text-xl">💬</span>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center space-x-6 mb-4 text-sm">
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link to="/support" className="hover:text-gray-300 transition-colors">Support</Link>
        </div>

        {/* Copyright & Status */}
        <div className="text-center text-gray-400">
          <p>© 2025  E-commerce Admin. All rights reserved.</p>
          <p className="mt-1">Secure Administrative Access Only</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <span className="text-green-400 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              System Operational
            </span>
            <span>99.9% Uptime</span>
            <span className="text-blue-400 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              SSL Secured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;