export interface User {
  id?: number;
  name: string;
  photoUrl?: string;
  description?: string;
  password?: string;
  email?: string;
  age?: number;
  address?: Address;
  type?: CustomerType;
  categories?: string[];
}

export interface Address {
  street: string;
  houseNumber: number;
  city: string;
}

export enum CustomerType {
  Standard,
  Premium,
  VIP
}

export interface Session {
  success: boolean;
  message: string;
  respons?: any;
  token?: string;
}
