
import { customerApi } from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stockQuantity: number;
  category: string;
  imageUrl: string | null;
  sku: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productService = {
  // Get all products with pagination
  async getProducts(page = 1, limit = 12, category?: string): Promise<PaginatedProducts> {
    const params: any = { page, limit };
    if (category) params.category = category;
    
    const response = await customerApi.get<PaginatedProducts>('/products', { params });
    return response.data;
  },

  // Get single product
  async getProduct(productId: number): Promise<Product> {
    const response = await customerApi.get<Product>(`/products/${productId}`);
    return response.data;
  },

  // Get categories
  async getCategories(): Promise<string[]> {
    const response = await customerApi.get<string[]>('/products/categories');
    return response.data;
  },
};
