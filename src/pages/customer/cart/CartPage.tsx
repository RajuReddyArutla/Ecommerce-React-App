// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCartStore } from '../../../store/cartStore';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package } from 'lucide-react';
// import toast from 'react-hot-toast';

// const CartPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
//     useCartStore();

//   // Debug: Log cart items
//   useEffect(() => {
//     console.log('🛒 Cart Items:', items);
//     console.log('📊 Total Items:', getTotalItems());
//     console.log('💰 Total Price:', getTotalPrice());
//   }, [items]);

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeItem(productId);
//       toast.success('Item removed from cart');
//     } else {
//       updateQuantity(productId, newQuantity);
//     }
//   };

//   const handleRemoveItem = (productId: number, productName: string) => {
//     removeItem(productId);
//     toast.success(`${productName} removed from cart`);
//   };

//   const handleClearCart = () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       clearCart();
//       toast.success('Cart cleared!');
//     }
//   };

//   const totalPrice = getTotalPrice();
//   const totalItems = getTotalItems();
//   const tax = totalPrice * 0.1;
//   const finalTotal = totalPrice + tax;

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center max-w-md p-8">
//           <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
//             <ShoppingBag className="w-16 h-16 text-gray-300" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
//           <p className="text-gray-600 mb-8">
//             Looks like you haven't added anything to your cart yet.
//           </p>
//           <button
//             onClick={() => navigate('/customer/products')}
//             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate('/customer/products')}
//             className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4 font-medium"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Continue Shopping
//           </button>
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
//               <p className="text-gray-600 mt-2">
//                 {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
//               </p>
//             </div>
//             <button
//               onClick={handleClearCart}
//               className="text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {items.map((item) => (
//               <div
//                 key={item.productId}
//                 className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
//               >
//                 <div className="flex items-start space-x-4">
//                   {/* Product Image */}
//                   <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {item.imageUrl ? (
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-full h-full object-contain"
//                         onError={(e) => {
//                           e.currentTarget.style.display = 'none';
//                           e.currentTarget.parentElement!.innerHTML = `
//                             <div class="flex items-center justify-center w-full h-full">
//                               <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
//                               </svg>
//                             </div>
//                           `;
//                         }}
//                       />
//                     ) : (
//                       <Package className="w-12 h-12 text-gray-300" />
//                     )}
//                   </div>

//                   {/* Product Info */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
//                       {item.name}
//                     </h3>
//                     <p className="text-indigo-600 font-bold text-xl">
//                       ${item.price.toFixed(2)}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">Price per unit</p>
//                   </div>

//                   {/* Quantity Controls */}
//                   <div className="flex flex-col items-end space-y-4">
//                     <button
//                       onClick={() => handleRemoveItem(item.productId, item.name)}
//                       className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
//                       title="Remove item"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>

//                     <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-2">
//                       <button
//                         onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
//                         className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//                       >
//                         <Minus className="w-4 h-4 text-gray-600" />
//                       </button>
//                       <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
//                       <button
//                         onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
//                         className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//                       >
//                         <Plus className="w-4 h-4 text-gray-600" />
//                       </button>
//                     </div>

//                     {/* Subtotal */}
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">Subtotal</p>
//                       <p className="font-bold text-gray-900 text-xl">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary - Sticky */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({totalItems} items)</span>
//                   <span className="font-semibold">${totalPrice.toFixed(2)}</span>
//                 </div>
                
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className="text-green-600 font-semibold">FREE</span>
//                 </div>
                
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax (10%)</span>
//                   <span className="font-semibold">${tax.toFixed(2)}</span>
//                 </div>
                
//                 <div className="border-t-2 border-gray-200 pt-4">
//                   <div className="flex justify-between text-xl font-bold text-gray-900">
//                     <span>Total</span>
//                     <span>${finalTotal.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate('/customer/checkout')}
//                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
//               >
//                 Proceed to Checkout
//               </button>

//               <button
//                 onClick={() => navigate('/customer/products')}
//                 className="w-full mt-3 border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-semibold"
//               >
//                 Continue Shopping
//               </button>

//               {/* Trust Badges */}
//               <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
//                 <div className="flex items-center space-x-3 text-sm text-gray-600">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-green-600 font-bold">✓</span>
//                   </div>
//                   <span>Secure Checkout</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-sm text-gray-600">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-green-600 font-bold">✓</span>
//                   </div>
//                   <span>FREE Shipping on all orders</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-sm text-gray-600">
//                   <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-green-600 font-bold">✓</span>
//                   </div>
//                   <span>Easy Returns within 30 days</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();

  useEffect(() => {
    console.log('🛒 Cart Items:', items);
  }, [items]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared!');
    }
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="bg-white rounded-2xl w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate('/customer/products')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/customer/products')}
            className="flex items-center text-indigo-600 hover:text-indigo-700 mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-2">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start space-x-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="flex items-center justify-center w-full h-full">
                              <Package class="w-8 h-8 text-gray-300" />
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <Package className="w-8 h-8 text-gray-300" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 font-bold text-xl">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Price per unit</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-4">
                    <button
                      onClick={() => handleRemoveItem(item.productId, item.name)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="font-bold text-gray-900 text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/customer/checkout')}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/customer/products')}
                className="w-full mt-3 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition-colors font-semibold"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>FREE Shipping on all orders</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span>Easy Returns within 30 days</span>
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