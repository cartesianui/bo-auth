import { Injectable, Injector } from '@angular/core';
import { Sandbox } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { select, Store } from '@ngrx/store';
import * as roleActions from './store/role.action';
import * as permissionActions from './store/permission.action';
import * as selectors from './store/auth.selector';
import { Role, RolePermissions, SearchPermissionForm, SearchRoleForm } from './models';
import { AuthorizationState } from './store/auth.state';

@Injectable()
export class AuthorizationSandbox extends Sandbox {
  roleFetchData$ = this.store.pipe(select(selectors.getRoleFetchData));
  roleLoading$ = this.store.pipe(select(selectors.getRoleLoading));
  roleLoaded$ = this.store.pipe(select(selectors.getRoleLoaded));
  roleFailed$ = this.store.pipe(select(selectors.getRoleFailed));

  rolesFetchData$ = this.store.pipe(select(selectors.getRolesFetchData));
  rolesFetchMeta$ = this.store.pipe(select(selectors.getRolesFetchMeta));
  rolesLoading$ = this.store.pipe(select(selectors.getRolesLoading));
  rolesLoaded$ = this.store.pipe(select(selectors.getRolesLoaded));
  rolesFailed$ = this.store.pipe(select(selectors.getRolesFailed));

  permissionFetchData$ = this.store.pipe(select(selectors.getPermissionFetchData));
  permissionLoading$ = this.store.pipe(select(selectors.getPermissionLoading));
  permissionLoaded$ = this.store.pipe(select(selectors.getPermissionLoaded));
  permissionFailed$ = this.store.pipe(select(selectors.getPermissionFailed));

  permissionsFetchData$ = this.store.pipe(select(selectors.getPermissionsFetchData));
  permissionsFetchMeta$ = this.store.pipe(select(selectors.getPermissionsFetchMeta));
  permissionsLoading$ = this.store.pipe(select(selectors.getPermissionsLoading));
  permissionsLoaded$ = this.store.pipe(select(selectors.getPermissionsLoaded));
  permissionsFailed$ = this.store.pipe(select(selectors.getPermissionsFailed));

  constructor(protected store: Store<AuthorizationState>, protected injector: Injector) {
    super(injector);
  }

  fetchRoles = (requestCriteria: RequestCriteria<SearchRoleForm>): void => {
    this.store.dispatch(roleActions.doFetchRoles({ requestCriteria }));
  };

  fetchRoleById = (id: string, criteria: RequestCriteria<SearchRoleForm>) => {
    this.store.dispatch(roleActions.doFetchRole({ id, criteria }));
  };

  createRole = (form: Role) => {
    this.store.dispatch(roleActions.doCreateRole({ form }));
  };

  deleteRoleById = (id: string) => {
    this.store.dispatch(roleActions.doDeleteRole({ id }));
  };

  attachPermissions = (permissionForm: RolePermissions): void => {
    this.store.dispatch(permissionActions.doAttachPermission({ permForm: permissionForm }));
  };

  detachPermissions = (permissionForm: RolePermissions): void => {
    this.store.dispatch(permissionActions.doDetachPermission({ permForm: permissionForm }));
  };

  fetchPermissions = (requestCriteria: RequestCriteria<SearchPermissionForm>): void => {
    this.store.dispatch(permissionActions.doFetchPermissions({ requestCriteria }));
  };

  fetchPermissionById = (id: string) => {
    this.store.dispatch(permissionActions.doFetchPermission({ id }));
  };

  syncPermissionsOnRole(form: RolePermissions) {
    this.store.dispatch(permissionActions.doSyncPermissions({ permForm: form }));
  }

  assignRole = (roleForm: any): void => {
    this.store.dispatch(roleActions.doAssignRole({ roleForm }));
  };

  revokeRole = (roleForm: any): void => {
    this.store.dispatch(roleActions.doRevokeRole({ roleForm }));
  };

  syncRolesOnUser(form: any) {
    this.store.dispatch(roleActions.doSyncRole({ roleForm: form }));
  }
}
