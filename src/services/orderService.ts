
import { orderApi } from './api';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderData {
  userId: number;
  shippingAddressId: number;
  paymentMethod: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export const orderService = {
  // Create order
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await orderApi.post<Order>('/orders', data);
    return response.data;
  },

  // Get user orders
  async getUserOrders(userId: number): Promise<Order[]> {
    const response = await orderApi.get<Order[]>(`/orders/user/${userId}`);
    return response.data;
  },

  // Get single order
  async getOrder(orderId: number): Promise<Order> {
    const response = await orderApi.get<Order>(`/orders/${orderId}`);
    return response.data;
  },

  // Cancel order
  async cancelOrder(orderId: number): Promise<Order> {
    const response = await orderApi.patch<Order>(`/orders/${orderId}/cancel`);
    return response.data;
  },
};
