import { IPagination } from './api-response';

export interface IUser {
  uuid: string;
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  profile: IUserProfile;
  lastLogin?: string;
  details: IUserDetails | null;
}

export interface IUsers {
  users: IUser[];
  pagination: IPagination;
}

export interface IUserProfile {
  freguesia: {
    uuid: string;
    name: string;
  };
  status: {
    name: string;
    color: string;
  };
  rating?: number;
  avatar: string | null;
  roles: IUserRole[];
  permissions?: IUserPermission[];
  rgbd?: boolean;
}

export interface IUserDetails {
  birthday?: Date;
  nif?: number;
  address?: string;
  zipCode?: string;
}

export interface IUserRole {
  uuid: string;
  code: string;
  name: string;
}

export interface IUserPermission {
  uuid: string;
  code: string;
  name: string;
}

export interface IUserStatus {
  name: string;
  color: string;
}
