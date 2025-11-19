// // src/services/user.service.ts
// import { api } from './api.service';
// import { 
//   User, 
//   Address, 
//   UpdateProfileData, 
//   CreateAddressData,
//   UserStatistics,
// } from '@/types/user.types';
// import { PaginatedResponse } from '@/types/api.types';
// import { API_URLS } from '@/utils/constants';

// export class UserService {
//   /**
//    * Get user profile
//    */
//   static async getProfile(userId: number): Promise<User> {
//     return api.get<User>(`${API_URLS.USER}/users/${userId}`);
//   }

//   /**
//    * Update user profile
//    */
//   static async updateProfile(userId: number, data: UpdateProfileData): Promise<User> {
//     return api.put<User>(`${API_URLS.USER}/users/${userId}`, data);
//   }

//   /**
//    * Get user addresses
//    */
//   static async getAddresses(userId: number): Promise<Address[]> {
//     return api.get<Address[]>(`${API_URLS.USER}/users/${userId}/addresses`);
//   }

//   /**
//    * Add new address
//    */
//   static async addAddress(userId: number, data: CreateAddressData): Promise<Address> {
//     return api.post<Address>(`${API_URLS.USER}/users/${userId}/addresses`, data);
//   }

//   /**
//    * Update address
//    */
//   static async updateAddress(
//     userId: number,
//     addressId: number,
//     data: Partial<CreateAddressData>
//   ): Promise<Address> {
//     return api.put<Address>(
//       `${API_URLS.USER}/users/${userId}/addresses/${addressId}`,
//       data
//     );
//   }

//   /**
//    * Delete address
//    */
//   static async deleteAddress(userId: number, addressId: number): Promise<void> {
//     return api.delete(`${API_URLS.USER}/users/${userId}/addresses/${addressId}`);
//   }

//   /**
//    * Set default address
//    */
//   static async setDefaultAddress(userId: number, addressId: number): Promise<Address> {
//     return api.put<Address>(
//       `${API_URLS.USER}/users/${userId}/addresses/${addressId}/default`
//     );
//   }

//   // ==================== ADMIN METHODS ====================

//   /**
//    * Get all users (Admin only)
//    */
//   static async getAllUsers(page: number = 1, limit: number = 20): Promise<PaginatedResponse<User>> {
//     return api.get<PaginatedResponse<User>>(
//       `${API_URLS.USER}/admin/users?page=${page}&limit=${limit}`
//     );
//   }

//   /**
//    * Get user statistics (Admin only)
//    */
//   static async getUserStatistics(): Promise<UserStatistics> {
//     return api.get<UserStatistics>(`${API_URLS.USER}/admin/users/statistics`);
//   }

//   /**
//    * Update user role (Admin only)
//    */
//   static async updateUserRole(userId: number, role: 'admin' | 'customer'): Promise<User> {
//     return api.put<User>(`${API_URLS.USER}/admin/users/${userId}/role`, { role });
//   }

//   /**
//    * Delete user (Admin only)
//    */
//   static async deleteUser(userId: number): Promise<void> {
//     return api.delete(`${API_URLS.USER}/admin/users/${userId}`);
//   }
// }