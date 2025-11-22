
import { customerApi } from './api';

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export const customerService = {
  // Get user addresses
  async getAddresses(userId: number): Promise<Address[]> {
    const response = await customerApi.get<Address[]>(`/users/${userId}/addresses`);
    return response.data;
  },

  // Add new address
  async addAddress(userId: number, data: CreateAddressData): Promise<Address> {
    const response = await customerApi.post<Address>(`/users/${userId}/addresses`, data);
    return response.data;
  },

  // Update address
  async updateAddress(userId: number, addressId: number, data: Partial<CreateAddressData>): Promise<Address> {
    const response = await customerApi.put<Address>(`/users/${userId}/addresses/${addressId}`, data);
    return response.data;
  },

  // Delete address
  async deleteAddress(userId: number, addressId: number): Promise<void> {
    await customerApi.delete(`/users/${userId}/addresses/${addressId}`);
  },

  // Get user profile
  async getProfile(userId: number) {
    const response = await customerApi.get(`/users/${userId}`);
    return response.data;
  },

  // Update profile
  async updateProfile(userId: number, data: any) {
    const response = await customerApi.put(`/users/${userId}`, data);
    return response.data;
  },
};
