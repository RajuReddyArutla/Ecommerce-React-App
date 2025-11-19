import { ReactNode } from "react";

// src/types/order.types.ts
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  pricePerUnit: string | number;
}

export interface Order {
  customerEmail: ReactNode;
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderDto {
  userId: number;
  shippingAddressId: number;
  paymentMethod: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface OrderAnalytics {
  totalRevenue: number;
  totalOrders: number;
  ordersByStatus: { status: string; count: number }[];
  topProducts: {
    productId: number;
    productName: string;
    totalSold: number;
    totalRevenue: number;
  }[];
  revenueTrend: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  avgOrderValue: number;
}