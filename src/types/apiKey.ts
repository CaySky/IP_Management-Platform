export interface APIKey {
  id: string;
  userId: string;
  key: string;
  name: string;
  permissions: string[];
  lastUsed?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface APIKeyFormData {
  name: string;
  permissions: string[];
  expiresAt?: string;
}