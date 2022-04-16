import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { authFeatureKey } from './auth.reducer';
import { AuthorizationState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthorizationState>(authFeatureKey);

export const getRoleFetchData: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.role.data);

export const getRoleLoaded: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.role.loaded);

export const getRoleLoading: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.role.loading);

export const getRoleFailed: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.role.failed);

export const getRolesFetchData: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.roles.data.data);

export const getRolesFetchMeta: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.roles.data.meta);

export const getRolesLoaded: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.roles.loaded);

export const getRolesLoading: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.roles.loading);

export const getRolesFailed: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.roles.failed);

export const getPermissionFetchData: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.permission.data);

export const getPermissionLoaded: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permission.loaded);

export const getPermissionLoading: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permission.loading);

export const getPermissionFailed: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permission.failed);

export const getPermissionsFetchData: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions.data.data);

export const getPermissionsFetchMeta: MemoizedSelector<object, object> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions.data.meta);

export const getPermissionsLoaded: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions.loaded);

export const getPermissionsLoading: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions.loading);

export const getPermissionsFailed: MemoizedSelector<object, boolean> = createSelector(getAuthState, (state: AuthorizationState) => state.permissions.failed);
