
import { useState } from 'react';
import { 
  Save, 
  Bell, 
  Shield, 
  Globe, 
  DollarSign, 
  Mail, 
  Lock,
  Key,
  Settings as SettingsIcon,
  Truck,
  CreditCard,
  FileText,
  Palette,
  Database,
  Users,
  Package,
  ShoppingCart
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'ShopHub Admin',
    supportEmail: 'support@shophub.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'en',
    
    // Store Settings
    storeName: 'E-Mart',
    storeDescription: 'Your trusted online marketplace',
    storeAddress: '',
    storePhone: '',
    taxRate: '18',
    
    // Notifications
    emailNotifications: true,
    lowStockAlerts: true,
    newUserRegistration: false,
    orderNotifications: true,
    paymentNotifications: true,
    
    // Shipping
    freeShippingThreshold: '500',
    standardShippingCost: '50',
    expressShippingCost: '150',
    
    // Payment
    enableCOD: true,
    enableOnlinePayment: true,
    
    // Security
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    
    // API
    authServiceUrl: 'http://localhost:3001',
    adminServiceUrl: 'http://localhost:3002',
  });

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    toast.success('Settings saved successfully!');
    console.log('Saving settings:', settings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        {/* <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Configure your platform settings
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* General Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-blue-50 p-2 rounded-lg">
                <SettingsIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => handleInputChange('platformName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select 
                  value={settings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-purple-50 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Store Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Description
                </label>
                <textarea
                  rows={2}
                  value={settings.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Phone
                </label>
                <input
                  type="tel"
                  value={settings.storePhone}
                  onChange={(e) => handleInputChange('storePhone', e.target.value)}
                  placeholder="+91 1234567890"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-50 p-2 rounded-lg">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive order updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Low Stock Alerts</p>
                  <p className="text-xs text-gray-500">Get notified when stock is low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.lowStockAlerts}
                    onChange={(e) => handleInputChange('lowStockAlerts', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Order Notifications</p>
                  <p className="text-xs text-gray-500">Alert for new orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.orderNotifications}
                    onChange={(e) => handleInputChange('orderNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">New User Registration</p>
                  <p className="text-xs text-gray-500">Alert when new users sign up</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.newUserRegistration}
                    onChange={(e) => handleInputChange('newUserRegistration', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Payment Notifications</p>
                  <p className="text-xs text-gray-500">Get payment confirmations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.paymentNotifications}
                    onChange={(e) => handleInputChange('paymentNotifications', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-orange-50 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Shipping Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange('freeShippingThreshold', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Shipping Cost (₹)
                </label>
                <input
                  type="number"
                  value={settings.standardShippingCost}
                  onChange={(e) => handleInputChange('standardShippingCost', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Express Shipping Cost (₹)
                </label>
                <input
                  type="number"
                  value={settings.expressShippingCost}
                  onChange={(e) => handleInputChange('expressShippingCost', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-yellow-50 p-2 rounded-lg">
                <CreditCard className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Accept COD payments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.enableCOD}
                    onChange={(e) => handleInputChange('enableCOD', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Online Payment</p>
                    <p className="text-xs text-gray-500">Card, UPI, Net Banking</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.enableOnlinePayment}
                    onChange={(e) => handleInputChange('enableOnlinePayment', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-red-50 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Security</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 text-left flex items-center gap-3 transition-all group">
                <Lock className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600">Change Password</span>
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 text-left flex items-center gap-3 transition-all group">
                <Key className="w-5 h-5 text-gray-500 group-hover:text-green-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Enable Two-Factor Authentication</span>
              </button>
              <button className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left flex items-center gap-3 transition-all group">
                <FileText className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">View Login History</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Session Timeout (min)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <Database className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">API Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auth Service URL
                </label>
                <input
                  type="text"
                  value={settings.authServiceUrl}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Service URL
                </label>
                <input
                  type="text"
                  value={settings.adminServiceUrl}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              API endpoints are configured in environment variables
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button 
            onClick={handleSaveSettings}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}