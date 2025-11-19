

import { User } from "./user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'customer';
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}