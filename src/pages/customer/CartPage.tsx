// import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
// import { useCartStore } from '@/store/cartStore';
// import { Link } from 'react-router-dom';
// import { cn } from '@/utils/cn';

// export default function CartPage() {
//   const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCartStore();

//   const handleQuantityChange = (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     updateQuantity(id, newQuantity);
//   };

//   const handleRemoveItem = (id: number) => {
//     removeItem(id);
//   };

//   if (items.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center py-12">
//           <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
//           <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
//           <Link
//             to="/customer/products"
//             className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             <ShoppingBag className="w-5 h-5 mr-2" />
//             Browse Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
//           <p className="text-gray-600 mt-2">
//             {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
//           </p>
//         </div>
//         <button
//           onClick={clearCart}
//           className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           Clear Cart
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
//             >
//               <div className="flex items-center space-x-4">
//                 {/* Product Image */}
//                 <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
//                   {item.image ? (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     <ShoppingBag className="w-8 h-8 text-gray-400" />
//                   )}
//                 </div>

//                 {/* Product Details */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg font-semibold text-gray-900 truncate">
//                     {item.name}
//                   </h3>
//                   <p className="text-2xl font-bold text-primary-600 mt-1">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                     className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                     disabled={item.quantity <= 1}
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
                  
//                   <span className="w-12 text-center font-semibold text-gray-900">
//                     {item.quantity}
//                   </span>
                  
//                   <button
//                     onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                     className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Item Total */}
//                 <div className="text-right">
//                   <p className="text-lg font-semibold text-gray-900">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="mt-2 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-semibold">${totalPrice.toFixed(2)}</span>
//               </div>
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span className="font-semibold">$0.00</span>
//               </div>
              
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Tax</span>
//                 <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
//               </div>
              
//               <div className="border-t pt-3">
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span className="text-primary-600">
//                     ${(totalPrice * 1.1).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <Link
//               to="/customer/checkout"
//               className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
//             >
//               Proceed to Checkout
//             </Link>
            
//             <Link
//               to="/customer/products"
//               className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold mt-3"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useCartStore } from '../../../store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => navigate('/customer/products')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/customer/products')}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
          <p className="text-gray-600 mt-2">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/customer/checkout')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/customer/products')}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;