// import React, { useEffect, useState } from 'react';
// // import { productService, Product } from '../../../services/productService';
// // import { useCartStore } from '../../../store/cartStore';
// import { ShoppingCart, Search,  Package } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore';
// import { Product } from '@/types/product.types';
// import { productService } from '@/services/productService';

// const ProductsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addItem, items } = useCartStore();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [categories, setCategories] = useState<string[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, [page, selectedCategory]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productService.getProducts(page, 12, selectedCategory);
//       setProducts(response.data);
//       setTotalPages(response.totalPages);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const cats = await productService.getCategories();
//       setCategories(cats);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const handleAddToCart = (product: Product) => {
//     addItem({
//         productId: product.id,
//         name: product.name,
//         price: Number(product.price),
//         quantity: 1,
//         imageUrl: product.imageUrl,
//         id: 0
//     });
//   };

//   const getCartItemQuantity = (productId: number) => {
//     const item = items.find((i: { productId: number; }) => i.productId === productId);
//     return item?.quantity || 0;
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const cartItemsCount = items.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//             <button
//               onClick={() => navigate('/customer/cart')}
//               className="relative bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               <span>Cart</span>
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Search and Filter */}
//           <div className="mt-4 flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               />
//             </div>

//             <select
//               value={selectedCategory}
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setPage(1);
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No products found</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
//               >
//                 {/* Product Image */}
//                 <div className="h-48 bg-gray-200 flex items-center justify-center">
//                   {product.imageUrl ? (
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <Package className="w-16 h-16 text-gray-400" />
//                   )}
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4">
//                   <div className="mb-2">
//                     <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
//                       {product.category}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {product.description}
//                   </p>
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-2xl font-bold text-indigo-600">
//                       ${Number(product.price).toFixed(2)}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       Stock: {product.stockQuantity}
//                     </span>
//                   </div>

//                   {/* Add to Cart Button */}
//                   {product.stockQuantity > 0 ? (
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={getCartItemQuantity(product.id) >= product.stockQuantity}
//                       className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
//                         getCartItemQuantity(product.id) >= product.stockQuantity
//                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                           : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                       }`}
//                     >
//                       {getCartItemQuantity(product.id) > 0
//                         ? `In Cart (${getCartItemQuantity(product.id)})`
//                         : 'Add to Cart'}
//                     </button>
//                   ) : (
//                     <button
//                       disabled
//                       className="w-full py-2 px-4 bg-red-100 text-red-600 rounded-lg font-medium cursor-not-allowed"
//                     >
//                       Out of Stock
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-8 flex justify-center space-x-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 text-gray-700">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


///////////////////////////

// import React, { useEffect, useState } from 'react';
// // import { productApi } from '../../../services/api';
// // import { useCartStore } from '../../../store/cartStore';
// import { ShoppingCart, Search, Heart, Star, TrendingUp, Package } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useCartStore } from '@/store/cartStore';
// import { productApi } from '@/services/api';

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   stockQuantity: number;
//   category: string;
//   imageUrl: string | null;
//   sku: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// const ProductsPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { addItem, items } = useCartStore();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [categories, setCategories] = useState<string[]>([]);
//   const [wishlist, setWishlist] = useState<Set<number>>(new Set());

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedCategory]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       console.log('🔍 Fetching products from:', productApi.defaults.baseURL);
      
//       // Fetch all products from the API
//       const response = await productApi.get('/products');
//       console.log('✅ Products API Response:', response);
      
//       let productData: Product[] = [];
      
//       // Handle different response formats
//       if (Array.isArray(response.data)) {
//         productData = response.data;
//       } else if (response.data.data && Array.isArray(response.data.data)) {
//         productData = response.data.data;
//       }

//       console.log('📦 Loaded products:', productData.length, productData);
//       setProducts(productData);
      
//       // Extract unique categories
//       const uniqueCategories = Array.from(new Set(productData.map(p => p.category))).filter(Boolean);
//       setCategories(uniqueCategories as string[]);
      
//       if (productData.length === 0) {
//         toast.error('No products found in database');
//       }
      
//     } catch (error: any) {
//       console.error('❌ Failed to fetch products:', error);
//       console.error('Error details:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         url: error.config?.url
//       });
//       toast.error(`Failed to load products: ${error.message}`);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = (product: Product) => {
//     addItem({
//       productId: product.id,
//       name: product.name,
//       price: Number(product.price),
//       quantity: 1,
//       imageUrl: product.imageUrl,
//     });
//     toast.success(`${product.name} added to cart!`, {
//       icon: '🛒',
//       duration: 2000,
//     });
//   };

//   const toggleWishlist = (productId: number) => {
//     setWishlist(prev => {
//       const newWishlist = new Set(prev);
//       if (newWishlist.has(productId)) {
//         newWishlist.delete(productId);
//         toast.success('Removed from wishlist', { icon: '💔' });
//       } else {
//         newWishlist.add(productId);
//         toast.success('Added to wishlist', { icon: '❤️' });
//       }
//       return newWishlist;
//     });
//   };

//   const getCartItemQuantity = (productId: number) => {
//     const item = items.find((i) => i.productId === productId);
//     return item?.quantity || 0;
//   };

//   // Filter products by search and category
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !selectedCategory || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading amazing products...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-3xl font-bold text-white flex items-center">
//               <TrendingUp className="w-8 h-8 mr-3" />
//               Shop Products
//             </h1>
//             <button
//               onClick={() => navigate('/customer/cart')}
//               className="relative bg-white text-indigo-600 px-6 py-3 rounded-full hover:shadow-lg transition-all flex items-center space-x-2 font-semibold"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               <span>Cart</span>
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Search and Filter */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search for products, brands and more..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-white focus:border-white shadow-lg"
//               />
//             </div>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-6 py-3 border-2 border-transparent rounded-lg focus:ring-2 focus:ring-white shadow-lg font-medium"
//             >
//               <option value="">All Categories</option>
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20">
//             <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
//             <p className="text-gray-500">
//               {products.length === 0 
//                 ? 'No products available yet. Please check back later!'
//                 : 'Try adjusting your search or filters'
//               }
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="mb-6">
//               <p className="text-gray-600">
//                 Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <div
//                   key={product.id}
//                   className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
//                 >
//                   {/* Wishlist Button */}
//                   <button
//                     onClick={() => toggleWishlist(product.id)}
//                     className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
//                   >
//                     <Heart
//                       className={`w-5 h-5 ${
//                         wishlist.has(product.id)
//                           ? 'fill-red-500 text-red-500'
//                           : 'text-gray-400'
//                       }`}
//                     />
//                   </button>

//                   {/* Product Image */}
//                   <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
//                     {product.imageUrl ? (
//                       <img
//                         src={product.imageUrl}
//                         alt={product.name}
//                         className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Package className="w-20 h-20 text-gray-300" />
//                       </div>
//                     )}
                    
//                     {/* Stock Badge */}
//                     {product.stockQuantity < 5 && product.stockQuantity > 0 && (
//                       <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                         Only {product.stockQuantity} left!
//                       </div>
//                     )}
                    
//                     {product.stockQuantity === 0 && (
//                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//                         <span className="text-white font-bold text-lg">OUT OF STOCK</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-4">
//                     {/* Category Badge */}
//                     <div className="mb-2">
//                       <span className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
//                         {product.category}
//                       </span>
//                     </div>

//                     {/* Product Name */}
//                     <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
//                       {product.name}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
//                       {product.description}
//                     </p>

//                     {/* Rating */}
//                     <div className="flex items-center mb-3">
//                       <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
//                         <span>4.5</span>
//                         <Star className="w-3 h-3 ml-1 fill-white" />
//                       </div>
//                       <span className="text-xs text-gray-500 ml-2">(150 reviews)</span>
//                     </div>

//                     {/* Price Section */}
//                     <div className="mb-4">
//                       <div className="flex items-center space-x-2">
//                         <span className="text-2xl font-bold text-gray-900">
//                           ${Number(product.price).toFixed(2)}
//                         </span>
//                         <span className="text-sm text-gray-500 line-through">
//                           ${(Number(product.price) * 1.2).toFixed(2)}
//                         </span>
//                         <span className="text-xs text-green-600 font-semibold">
//                           17% off
//                         </span>
//                       </div>
//                       <p className="text-xs text-green-600 mt-1 font-medium">✓ Free delivery</p>
//                     </div>

//                     {/* Add to Cart Button */}
//                     {product.stockQuantity > 0 ? (
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={getCartItemQuantity(product.id) >= product.stockQuantity}
//                         className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
//                           getCartItemQuantity(product.id) >= product.stockQuantity
//                             ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                             : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg'
//                         }`}
//                       >
//                         <ShoppingCart className="w-5 h-5" />
//                         <span>
//                           {getCartItemQuantity(product.id) > 0
//                             ? `In Cart (${getCartItemQuantity(product.id)})`
//                             : 'Add to Cart'}
//                         </span>
//                       </button>
//                     ) : (
//                       <button
//                         disabled
//                         className="w-full py-3 bg-red-100 text-red-600 rounded-lg font-semibold cursor-not-allowed"
//                       >
//                         Out of Stock
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
// import { useCartStore } from '../../../store/cartStore';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stockQuantity: number;
  category: string;
  imageUrl: string | null;
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem, items } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Attempting to fetch products...');
      console.log('📍 URL:', 'http://localhost:3006/products');
      
      // Direct axios call to debug
      const response = await axios.get('http://localhost:3006/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('✅ Raw Response:', response);
      console.log('📦 Response Data:', response.data);
      console.log('📊 Response Status:', response.status);
      
      let productData: Product[] = [];
      
      if (Array.isArray(response.data)) {
        productData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
      } else {
        console.warn('⚠️ Unexpected response format:', response.data);
      }

      console.log('✨ Final Products:', productData);
      setProducts(productData);
      
      if (productData.length === 0) {
        setError('No products found in database. Please add products via Postman.');
      }
      
    } catch (err: any) {
      console.error('❌ Error fetching products:', err);
      console.error('❌ Error Message:', err.message);
      console.error('❌ Error Response:', err.response?.data);
      console.error('❌ Error Status:', err.response?.status);
      
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to Product Service. Is it running on port 3006?');
      } else if (err.response?.status === 404) {
        setError('Products endpoint not found. Check your Product Service routes.');
      } else {
        setError(`Failed to load products: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
          <p className="text-sm text-gray-500 mt-2">Check console (F12) for logs</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow">
          <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
          <div className="mt-6 text-left bg-gray-50 p-4 rounded text-sm">
            <p className="font-semibold mb-2">Debug Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Check if Product Service is running: <code>curl http://localhost:3006/products</code></li>
              <li>Open browser console (F12) and check for errors</li>
              <li>Verify CORS is enabled in Product Service</li>
              <li>Check .env has: <code>VITE_PRODUCT_API_URL=http://localhost:3006</code></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-indigo-600 text-white p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => navigate('/customer/cart')}
            className="relative bg-white text-indigo-600 px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2 font-semibold"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto p-6">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Available</h2>
            <p className="text-gray-500 mb-4">Add products using Postman to see them here.</p>
            <div className="bg-gray-50 p-4 rounded text-left max-w-md mx-auto text-sm">
              <p className="font-semibold mb-2">Add a product via Postman:</p>
              <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
{`POST http://localhost:3006/products
Content-Type: application/json

{
  "name": "Test Product",
  "description": "Test description",
  "price": 99.99,
  "stockQuantity": 10,
  "category": "Electronics"
}`}
              </pre>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing <span className="font-semibold">{products.length}</span> products
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-16 h-16 text-gray-300" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-lg mt-2 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-indigo-600">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.stockQuantity}
                      </span>
                    </div>
                    
                    {product.stockQuantity > 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;