import { CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your purchase</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Checkout Coming Soon
          </h3>
          <p className="text-gray-600">
            Waiting for Checkout API collection
          </p>
        </div>
      </div>
    </div>
  );
}
