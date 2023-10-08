import { Injectable, Injector } from '@angular/core';
import { Sandbox } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { select, Store } from '@ngrx/store';
import * as roleActions from './store/role.action';
import * as permissionActions from './store/permission.action';
import { Role, RolePermissions, PermissionSearch, RoleSearch, Permission } from './models';
import { AuthorizationState } from './store/auth.state';
import { RoleActions } from './store/role/role.actions';
import { PermissionActions } from './store/permission/permission.actions';
import * as fromRoles from './store/role/role.reducer';
import * as fromPermissions from './store/permission/permission.reducer';
// import * as selectors from './store/auth.selector';
// import { AuthHttpService } from './shared/auth-http.service';

@Injectable()
export class AuthorizationSandbox extends Sandbox {
  rolesData$ = this.store.pipe(select(fromRoles.entities));
  rolesMetaData$ = this.store.pipe(select(fromRoles.meta));
  selectedRole$ = this.store.pipe(select(fromRoles.selected));

  permissionsData$ = this.store.pipe(select(fromPermissions.entities));
  permissionsMetaData$ = this.store.pipe(select(fromPermissions.meta));
  selectedPermission$ = this.store.pipe(select(fromPermissions.selected));

  // roleData$ = this.store.pipe(select(selectors.getRoleData));
  // permissionData$ = this.store.pipe(select(selectors.getPermissionData));
  // permissionLoading$ = this.store.pipe(select(selectors.getPermissionLoading));
  // permissionLoaded$ = this.store.pipe(select(selectors.getPermissionLoaded));
  // permissionFailed$ = this.store.pipe(select(selectors.getPermissionFailed));
  // roleLoading$ = this.store.pipe(select(selectors.getRoleLoading));
  // roleLoaded$ = this.store.pipe(select(selectors.getRoleLoaded));
  // roleFailed$ = this.store.pipe(select(selectors.getRoleFailed));
  // rolesLoading$ = this.store.pipe(select(selectors.getRolesLoading));
  // rolesLoaded$ = this.store.pipe(select(selectors.getRolesLoaded));
  // rolesFailed$ = this.store.pipe(select(selectors.getRolesFailed));
  // permissionsLoading$ = this.store.pipe(select(selectors.getPermissionsLoading));
  // permissionsLoaded$ = this.store.pipe(select(selectors.getPermissionsLoaded));
  // permissionsFailed$ = this.store.pipe(select(selectors.getPermissionsFailed));

  constructor(
    protected store: Store<AuthorizationState>,
    protected override injector: Injector
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
   * @param form: RolePermissions
   */
  syncPermissions(form: RolePermissions) {
    this.store.dispatch(RoleActions.syncPermissions({ form }));
  }

  attachPermissions = (form: RolePermissions): void => {
    this.store.dispatch(RoleActions.attachPermissions({ form }));
  };

  detachPermissions = (form: RolePermissions): void => {
    this.store.dispatch(RoleActions.detachPermissions({ form }));
  };

  // fetchPermission = (id: string) => {
  //   this.store.dispatch(permissionActions.doFetchPermission({ id }));
  // };

  // fetchRole = (id: string, criteria: RequestCriteria<RoleSearch>) => {
  //   this.store.dispatch(roleActions.doFetchRole({ id, criteria }));
  // };

  // fetchUserRoles = (id: string, requestCriteria: RequestCriteria<SearchRoleForm>): void => {
  //   this.store.dispatch(roleActions.doFetchUserRoles({ id, requestCriteria }));
  // };

  // fetchUserPermissions = (id: string, requestCriteria: RequestCriteria<SearchPermissionForm>): void => {
  //   this.store.dispatch(permissionActions.doFetchUserPermissions({ id, requestCriteria }));
  // };

  // fetchRolePermissions = (id: string, requestCriteria: RequestCriteria<SearchPermissionForm>): void => {
  //   this.store.dispatch(permissionActions.doFetchRolePermissions({ id, requestCriteria }));
  // };

  // assignRole = (roleForm: any): void => {
  //   this.store.dispatch(roleActions.doAssignRole({ roleForm }));
  // };

  // revokeRole = (roleForm: any): void => {
  //   this.store.dispatch(roleActions.doRevokeRole({ roleForm }));
  // };

  // syncRolesOnUser(form: any) {
  //   this.store.dispatch(roleActions.doSyncRole({ roleForm: form }));
  // }
}
