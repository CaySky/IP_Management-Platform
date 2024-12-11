export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface UserFormData {
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
}