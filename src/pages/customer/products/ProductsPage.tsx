// File 55: src/pages/customer/products/ProductsPage.tsx
import { Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600 mt-2">Browse our product catalog</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Product Catalog Coming Soon
          </h3>
          <p className="text-gray-600">
            Waiting for Customer Products API collection
          </p>
        </div>
      </div>
    </div>
  );
}