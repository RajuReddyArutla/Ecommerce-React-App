import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Heart, Star, TrendingUp, Package, Filter } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string | number;
  stockQuantity: number;
  category: string;
  imageUrl: string | null;
  sku?: string | null;
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem, items } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔍 Fetching products from http://localhost:3006/products');
      
      const response = await axios.get('http://localhost:3006/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('✅ Products loaded:', response.data);
      
      let productData: Product[] = [];
      if (Array.isArray(response.data)) {
        productData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        productData = response.data.data;
      }

      setProducts(productData);
      setFilteredProducts(productData);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(productData.map(p => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories);
      
      if (productData.length === 0) {
        setError('No products available yet. Add products via Postman or Admin panel.');
      } else {
        toast.success(`Loaded ${productData.length} products!`);
      }
      
    } catch (err: any) {
      console.error('❌ Error:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to Product Service. Is it running on port 3006?');
      } else {
        setError(`Failed to load products: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success(`🛒 ${product.name} added to cart!`, {
      duration: 2000,
      position: 'top-center',
    });
  };

  const toggleWishlist = (productId: number, productName: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast.success(`💔 Removed from wishlist`);
      } else {
        newWishlist.add(productId);
        toast.success(`❤️ Added to wishlist`);
      }
      return newWishlist;
    });
  };

  const getCartQuantity = (productId: number) => {
    const item = items.find(i => i.productId === productId);
    return item?.quantity || 0;
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading amazing products...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
          <Package className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Amazon Style */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-white" />
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Shop Products
              </h1>
            </div>
            
            <button
              onClick={() => navigate('/customer/cart')}
              className="relative bg-white text-indigo-600 px-4 md:px-6 py-2 md:py-3 rounded-full hover:shadow-xl transition-all flex items-center space-x-2 font-semibold"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-white focus:border-white shadow-lg text-gray-900"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 md:px-6 py-3 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-white shadow-lg font-medium text-gray-900"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Category Chips */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-white text-indigo-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-indigo-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {products.length === 0 ? 'No Products Available' : 'No Results Found'}
            </h2>
            <p className="text-gray-500 mb-6">
              {products.length === 0
                ? 'Products will appear here once added by admin.'
                : 'Try adjusting your search or filters.'}
            </p>
            {products.length === 0 && (
              <button
                onClick={() => navigate('/customer/dashboard')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> product
                {filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const inCart = getCartQuantity(product.id);
                const isInWishlist = wishlist.has(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Wishlist Button */}
                    <div className="relative">
                      <button
                        onClick={() => toggleWishlist(product.id, product.name)}
                        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </button>

                      {/* Product Image */}
                      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center">
                                  <svg class="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-20 h-20 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Stock Badge */}
                      {product.stockQuantity > 0 && product.stockQuantity < 10 && (
                        <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Only {product.stockQuantity} left!
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* Category Badge */}
                      <span className="inline-block text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold mb-2">
                        {product.category}
                      </span>

                      {/* Product Name */}
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
                        {product.description}
                      </p>

                      {/* Rating (Mock) */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          <span>4.{Math.floor(Math.random() * 5) + 3}</span>
                          <Star className="w-3 h-3 ml-1 fill-white" />
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          ({Math.floor(Math.random() * 500) + 50} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${Number(product.price).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${(Number(product.price) * 1.25).toFixed(2)}
                          </span>
                          <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                            20% off
                          </span>
                        </div>
                        <p className="text-xs text-green-600 mt-1 font-medium flex items-center">
                          <span className="mr-1">✓</span> FREE Delivery
                        </p>
                      </div>

                      {/* Add to Cart Button */}
                      {product.stockQuantity > 0 ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={inCart >= product.stockQuantity}
                          className={`w-full py-3 rounded-lg font-semibold transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${
                            inCart >= product.stockQuantity
                              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{inCart > 0 ? `In Cart (${inCart})` : 'Add to Cart'}</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-3 bg-red-100 text-red-600 rounded-lg font-semibold cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;