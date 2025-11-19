// // src/services/product.service.ts

// import { Product, CreateProductDto, UpdateProductDto, ProductFilters } from '@/types/product.types';
// import { PaginatedResponse } from '@/types/api.types';


// export class ProductService {
//   /**
//    * Get all products
//    */
//   static async getAllProducts(
//     page: number = 1,
//     limit: number = 20,
//     filters?: ProductFilters
//   ): Promise<PaginatedResponse<Product>> {
//     const params = new URLSearchParams({
//       page: page.toString(),
//       limit: limit.toString(),
//       ...(filters?.search && { search: filters.search }),
//       ...(filters?.category && { category: filters.category }),
//       ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
//       ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
//       ...(filters?.inStock !== undefined && { inStock: filters.inStock.toString() }),
//     });

//     return api.get<PaginatedResponse<Product>>(
//       `${API_URLS.PRODUCT}/products?${params.toString()}`
//     );
//   }

//   /**
//    * Get product by ID
//    */
//   static async getProductById(id: number): Promise<Product> {
//     return api.get<Product>(`${API_URLS.PRODUCT}/products/${id}`);
//   }

//   // ==================== ADMIN METHODS ====================

//   /**
//    * Create product (Admin only)
//    */
//   static async createProduct(data: CreateProductDto): Promise<Product> {
//     return api.post<Product>(`${API_URLS.PRODUCT}/admin/products`, data);
//   }

//   /**
//    * Update product (Admin only)
//    */
//   static async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
//     return api.patch<Product>(`${API_URLS.PRODUCT}/admin/products/${id}`, data);
//   }

//   /**
//    * Delete product (Admin only)
//    */
//   static async deleteProduct(id: number): Promise<void> {
//     return api.delete(`${API_URLS.PRODUCT}/admin/products/${id}`);
//   }

//   /**
//    * Get low stock products (Admin only)
//    */
//   static async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
//     return api.get<Product[]>(
//       `${API_URLS.PRODUCT}/admin/products/low-stock/alert?threshold=${threshold}`
//     );
//   }
// }