export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://instagram.com" className="hover:text-pink-400 transition-colors">
            <div className="flex items-center space-x-2">
              <span>📷</span>
              <span>Instagram</span>
            </div>
          </a>
          <a href="https://facebook.com" className="hover:text-blue-400 transition-colors">
            <div className="flex items-center space-x-2">
              <span>👥</span>
              <span>Facebook</span>
            </div>
          </a>
          <a href="https://wa.me" className="hover:text-green-400 transition-colors">
            <div className="flex items-center space-x-2">
              <span>💬</span>
              <span>WhatsApp</span>
            </div>
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>© 2025 E-commerce Admin. All rights reserved.</p>
          <p className="mt-1">Secure Administrative Access Only</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <span className="text-green-400">System Operational</span>
            <span>99.9% Uptime</span>
            <span className="text-blue-400">SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}