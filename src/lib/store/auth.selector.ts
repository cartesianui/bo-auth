import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { authFeatureKey } from './auth.reducer';
import { AuthorizationState, RolesState, RoleState, PermissionsState, PermissionState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthorizationState>(authFeatureKey);

export const getRoleState: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.role);
export const getRoleData: MemoizedSelector<object, object> = createSelector(getRoleState, (state: RoleState) => state.data);
export const getRoleLoaded: MemoizedSelector<object, boolean> = createSelector(getRoleState, (state: RoleState) => state.loaded);
export const getRoleLoading: MemoizedSelector<object, boolean> = createSelector(getRoleState, (state: RoleState) => state.loading);
export const getRoleFailed: MemoizedSelector<object, boolean> = createSelector(getRoleState, (state: RoleState) => state.failed);


export const getRolesState: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.roles);
export const getRolesData: MemoizedSelector<object, object> = createSelector(getRolesState, (state: RolesState) => state.data.data);
export const getRolesMetaData: MemoizedSelector<object, object> = createSelector(getRolesState, (state: RolesState) => state.data.meta);
export const getRolesLoaded: MemoizedSelector<object, boolean> = createSelector(getRolesState, (state: RolesState) => state.loaded);
export const getRolesLoading: MemoizedSelector<object, boolean> = createSelector(getRolesState, (state: RolesState) => state.loading);
export const getRolesFailed: MemoizedSelector<object, boolean> = createSelector(getRolesState, (state: RolesState) => state.failed);

export const getPermissionState: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.permission);
export const getPermissionData: MemoizedSelector<object, object> = createSelector(getPermissionState, (state: PermissionState) => state.data);
export const getPermissionLoaded: MemoizedSelector<object, boolean> = createSelector(getPermissionState, (state: PermissionState) => state.loaded);
export const getPermissionLoading: MemoizedSelector<object, boolean> = createSelector(getPermissionState, (state: PermissionState) => state.loading);
export const getPermissionFailed: MemoizedSelector<object, boolean> = createSelector(getPermissionState, (state: PermissionState) => state.failed);

export const getPermissionsState: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions);
export const getPermissionsData: MemoizedSelector<object, object> = createSelector(getPermissionsState, (state: PermissionsState) => state.data.data);
export const getPermissionsMetaData: MemoizedSelector<object, object> = createSelector(getPermissionsState, (state: PermissionsState) => state.data.meta);
export const getPermissionsLoaded: MemoizedSelector<object, boolean> = createSelector(getPermissionsState, (state: PermissionsState) => state.loaded);
export const getPermissionsLoading: MemoizedSelector<object, boolean> = createSelector(getPermissionsState, (state: PermissionsState) => state.loading);
export const getPermissionsFailed: MemoizedSelector<object, boolean> = createSelector(getPermissionsState, (state: PermissionsState) => state.failed);
