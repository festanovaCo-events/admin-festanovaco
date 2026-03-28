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
  accounts: Account[];
}

export type RegisterResponseData = User;
export type LoginResponseData = User;

