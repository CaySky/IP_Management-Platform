import { atom } from 'jotai';
import type { User } from '../types/user';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom(get => get(userAtom) !== null);
export const isAdminAtom = atom(get => get(userAtom)?.role === 'admin');

export const validateCredentials = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};