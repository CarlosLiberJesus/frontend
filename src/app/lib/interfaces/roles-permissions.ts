export interface IUserRole {
  uuid: string;
  code: string;
  name: string;
  color: string;
  cargo?: string;
  description?: string;
  department?: IUserDepartment[];
}

export interface IUserDepartment {
  uuid: string;
  name: string;
  cargo?: string;
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

export interface IModule {
  uuid: string;
  name: string;
  code: string;
  description?: string;
}

export interface IModules {
  modules: IModule[];
}

export interface IPermission {
  uuid: string;
  name: string;
  code: string;
  description?: string;
}

export interface IPermissions {
  permissions: IPermission[];
}

export interface IRole {
  uuid: string;
  name: string;
  color: string;
  code: string;
  icon?: string;
  description?: string;
  permissions?: IPermission[];
}
