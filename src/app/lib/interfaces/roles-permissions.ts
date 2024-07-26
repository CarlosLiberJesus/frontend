export interface IUserRole {
  uuid: string;
  code: string;
  name: string;
  color: string;
  description?: string;
}

export interface IUserPermission {
  uuid: string;
  code: string;
  name: string;
  description?: string;
}

export interface IUserRoles {
  roles: IUserRole[];
}

export interface IUserPermissions {
  permissions: IUserPermission[];
}

export interface IUserStatuses {
  statuses: {
    uuid: string;
    name: string;
    color: string;
    description?: string;
  }[];
}
