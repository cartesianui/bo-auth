import { Role, Permission } from '../models';

export interface RoleState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Role | null;
}

export interface RolesState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Role>;
    meta: object;
  };
}

export interface PermissionState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Permission | null;
}

export interface PermissionsState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Permission>;
    meta: object;
  };
}

export interface AuthorizationState {
  roles: RolesState;
  role: RoleState;
  permissions: PermissionsState;
  permission: PermissionState;
}
