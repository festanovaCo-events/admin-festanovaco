/**
 * Interfaces para las peticiones de autenticación
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Interfaces para las respuestas de la API
 */

export interface Account {
  id: string;
  owner: null;
  ownerId: string;
  isActive: boolean;
  members: unknown[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  token: string;
}

export interface RegisterResponseData extends User {
  account: Account;
}

export interface LoginResponseData extends User {
  accounts: Account[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;
export type LoginResponse = ApiResponse<LoginResponseData>;
