
// // src/services/order.service.ts

// import { Order, CreateOrderDto, OrderAnalytics } from '@/types/order.types';
// import { PaginatedResponse } from '@/types/api.types';


// export class OrderService {
//   /**
//    * Create order
//    */
//   static async createOrder(data: CreateOrderDto): Promise<Order> {
//     return api.post<Order>(`${API_URLS.ORDER}/orders`, data);
//   }

//   /**
//    * Get user orders
//    */
//   static async getUserOrders(userId: number): Promise<Order[]> {
//     return api.get<Order[]>(`${API_URLS.ORDER}/orders/user/${userId}`);
//   }

//   /**
//    * Get order by ID
//    */
//   static async getOrderById(id: number): Promise<Order> {
//     return api.get<Order>(`${API_URLS.ORDER}/orders/${id}`);
//   }

//   // ==================== ADMIN METHODS ====================

//   /**
//    * Get all orders (Admin only)
//    */
//   static async getAllOrders(
//     page: number = 1,
//     limit: number = 20,
//     status?: string
//   ): Promise<PaginatedResponse<Order>> {
//     const params = new URLSearchParams({
//       page: page.toString(),
//       limit: limit.toString(),
//       ...(status && { status }),
//     });

//     return api.get<PaginatedResponse<Order>>(
//       `${API_URLS.ORDER}/admin/orders/all?${params.toString()}`
//     );
//   }

//   /**
//    * Get order analytics (Admin only)
//    */
//   static async getOrderAnalytics(): Promise<OrderAnalytics> {
//     return api.get<OrderAnalytics>(`${API_URLS.ORDER}/admin/orders/analytics`);
//   }

//   /**
//    * Get recent orders (Admin only)
//    */
//   static async getRecentOrders(limit: number = 10): Promise<Order[]> {
//     return api.get<Order[]>(`${API_URLS.ORDER}/admin/orders/recent?limit=${limit}`);
//   }

//   /**
//    * Update order status (Admin only)
//    */
//   static async updateOrderStatus(id: number, status: string): Promise<Order> {
//     return api.patch<Order>(`${API_URLS.ORDER}/admin/orders/${id}/status`, { status });
//   }
// }