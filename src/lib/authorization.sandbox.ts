import { inject, Injectable, Injector } from '@angular/core';
import { Sandbox } from '@cartesianui/common';
import { RequestCriteriaOuput } from '@cartesianui/core';
import { select, Store } from '@ngrx/store';
import { Role, RolePermissions, Permission } from './models';
import { RoleActions } from './store/role/role.actions';
import { PermissionActions } from './store/permission/permission.actions';
import * as fromRoles from './store/role/role.reducer';
import * as fromPermissions from './store/permission/permission.reducer';

@Injectable({providedIn: 'root'})
export class AuthorizationSandbox extends Sandbox {
  private store = inject(Store);

  rolesData$ = this.store.pipe(select(fromRoles.entities));
  rolesMetaData$ = this.store.pipe(select(fromRoles.meta));
  selectedRole$ = this.store.pipe(select(fromRoles.selected));
  createState$ = this.store.pipe(select(fromRoles.create));

  permissionsData$ = this.store.pipe(select(fromPermissions.entities));
  permissionsMetaData$ = this.store.pipe(select(fromPermissions.meta));
  selectedPermission$ = this.store.pipe(select(fromPermissions.selected));

  // constructor() {
  //   super();
  // }

  getRoles = (criteria: RequestCriteriaOuput) => {
    this.store.dispatch(RoleActions.getRoles({ criteria }));
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

  getPermissions = (criteria: RequestCriteriaOuput): void => {
    this.store.dispatch(PermissionActions.getPermissions({ criteria }));
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
  syncPermissions = (id: string, form: RolePermissions) => {
    this.store.dispatch(RoleActions.syncPermissions({ id, form }));
  }

  attachPermissions = (id: string, form: RolePermissions): void => {
    this.store.dispatch(RoleActions.attachPermissions({ id, form }));
  };

  detachPermissions = (id: string, form: RolePermissions): void => {
    this.store.dispatch(RoleActions.detachPermissions({ id, form }));
  };
}
