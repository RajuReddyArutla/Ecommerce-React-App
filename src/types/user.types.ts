// export interface User {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   isAdmin: boolean;
//   role: 'admin' | 'customer';
//   createdAt: string;
//   updatedAt: string;
// }

// export interface UserStatistics {
//   totalUsers: number;
//   adminCount: number;
//   customerCount: number;
//   newUsersThisMonth: number;
//   activeUsers?: number;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export interface UpdateRoleData {
//   role: 'admin' | 'customer';
// }

// export interface UserResponse {
//   user: User;
//   token: string;
// }


export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  role: 'admin' | 'customer';
  createdAt: string;
  updatedAt: string;
}

export interface UserStatistics {
  totalUsers: number;
  adminCount: number;
  customerCount: number;
  activeUsers: number;
  newUsersThisMonth: number;
}

export interface UsersResponse {
  data: User[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}