import { Role } from '../enums/role.enum';

export interface IUser {
  id: string;
  username: string;
  email?: string;
  displayName: string;
  role: Role;
  isActive: boolean;
  totpEnabled: boolean;
  department?: string;
  hospital?: string;
  phone?: string;
  avatarUrl?: string;
  isFirstLogin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUserInput {
  username: string;
  password: string;
  displayName: string;
  role: Role;
  department?: string;
  hospital?: string;
  email?: string;
  phone?: string;
}

export interface IUpdateUserInput {
  displayName?: string;
  isActive?: boolean;
  department?: string;
  hospital?: string;
  email?: string;
  phone?: string;
}
