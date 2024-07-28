import { IPagination } from './api-response';
import { IUserPermission, IUserRole } from './roles-permissions';
import { IUserLocation } from './user-location';

export interface IUser {
  uuid: string;
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  profile: IUserProfile;
  lastLogin?: string;
  roles: IUserRole[];
  permissions?: IUserPermission[];
  details: IUserDetails | null;
}

export interface IUsers {
  users: IUser[];
  pagination: IPagination;
}

export interface IUserProfile {
  location: IUserLocation;
  status: {
    name: string;
    color: string;
  };
  rating?: number;
  avatar: string | null;
  rgbd?: boolean;
}

export interface IUserDetails {
  birthday?: Date;
  nif?: number;
  address?: string;
  zipCode?: string;
}

export interface IUserStatus {
  name: string;
  color: string;
}

export interface IUserValid {
  valid: boolean;
}
