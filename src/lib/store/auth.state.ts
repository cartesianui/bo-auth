import { EntityState, EntityListState } from '@cartesianui/common';

import { Role, Permission } from '../models';

export type RoleState = EntityState<Role>;

export type RolesState = EntityListState<Role>;

export type PermissionState = EntityState<Permission>;

export type PermissionsState = EntityListState<Permission>;

export interface AuthorizationState {
  roles: RolesState;
  role: RoleState;
  permissions: PermissionsState;
  permission: PermissionState;
}
