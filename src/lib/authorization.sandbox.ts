import { Injectable, Injector } from '@angular/core';
import { Sandbox } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { select, Store } from '@ngrx/store';
import { Role, RolePermissions, PermissionSearch, RoleSearch, Permission } from './models';
import { RoleActions } from './store/role/role.actions';
import { PermissionActions } from './store/permission/permission.actions';
import * as fromRoles from './store/role/role.reducer';
import * as fromPermissions from './store/permission/permission.reducer';

@Injectable()
export class AuthorizationSandbox extends Sandbox {
  rolesData$ = this.store.pipe(select(fromRoles.entities));
  rolesMetaData$ = this.store.pipe(select(fromRoles.meta));
  selectedRole$ = this.store.pipe(select(fromRoles.selected));
  creationState$ = this.store.pipe(select(fromRoles.creation));

  permissionsData$ = this.store.pipe(select(fromPermissions.entities));
  permissionsMetaData$ = this.store.pipe(select(fromPermissions.meta));
  selectedPermission$ = this.store.pipe(select(fromPermissions.selected));

  constructor(
    protected override injector: Injector,
    protected store: Store
  ) {
    super(injector);
  }

  fetchRoles = (criteria: RequestCriteria<RoleSearch>) => {
    this.store.dispatch(RoleActions.fetchRoles({ criteria }));
  };

  selectRole = (role: Role) => {
    this.store.dispatch(RoleActions.selectRole({ role }));
  };

  createRole = (role: Role) => {
    this.store.dispatch(RoleActions.createRole({ role }));
  };

  updateRole = (id: string, role: Role) => {
    this.store.dispatch(RoleActions.updateRole({ role: { id, changes: role } }));
  };

  deleteRole = (id: string) => {
    this.store.dispatch(RoleActions.deleteRole({ id }));
  };

  fetchPermissions = (criteria: RequestCriteria<PermissionSearch>): void => {
    this.store.dispatch(PermissionActions.fetchPermissions({ criteria }));
  };

  selectPermission = (permission: Permission) => {
    this.store.dispatch(PermissionActions.selectPermission({ permission }));
  };

  /**
   * Sync Role Permissions
   * 
   * Replaces old with new ones
   *
   * @param form: RolePermissions
   */
  syncPermissions = (form: RolePermissions) => {
    this.store.dispatch(RoleActions.syncPermissions({ form }));
  }

  attachPermissions = (form: RolePermissions): void => {
    this.store.dispatch(RoleActions.attachPermissions({ form }));
  };

  detachPermissions = (form: RolePermissions): void => {
    this.store.dispatch(RoleActions.detachPermissions({ form }));
  };
}
