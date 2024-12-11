export interface IP {
  id: string;
  address: string;
  subnet?: number;
  name: string;
  description?: string;
  status: 'available' | 'allocated' | 'reserved';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface IPFormData {
  address: string;
  subnet?: number;
  name: string;
  description?: string;
  status: 'available' | 'allocated' | 'reserved';
}

export interface IPRange {
  startIP: string;
  endIP: string;
  totalIPs: number;
}