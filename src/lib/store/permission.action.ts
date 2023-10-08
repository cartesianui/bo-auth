import { createAction, props } from '@ngrx/store';
import { RequestCriteria, type } from '@cartesianui/core';
import { RolePermissions } from '../models/domain/role-permissions.model';
import { PermissionSearch } from '../models/form/permission.search';
import { Permission } from '../models/domain/permission.model';

/**
 * Fetch Permission Actions
 */
export const doFetchPermission = createAction(type('[Auth] Do Fetch Permission'), props<{ id: string }>());
export const doFetchPermissionSuccess = createAction(type('[Auth] Do Fetch Permission Success'), props<{ permission: Permission }>());
export const doFetchPermissionFail = createAction(type('[Auth] Do Fetch Permission Fail'), props<{ error: any }>());

/**
 * Fetch Permissions Actions
 */
export const doFetchPermissions = createAction(type('[Auth] Do Fetch Permissions'), props<{ requestCriteria: RequestCriteria<PermissionSearch> }>());
export const doFetchPermissionsSuccess = createAction(type('[Auth] Do Fetch Permissions Success'), props<{ permissions: Permission[] }>());
export const doFetchPermissionsFail = createAction(type('[Auth] Do Fetch Permissions Fail'), props<{ error: any }>());

/**
 * Fetch Role Permissions Actions
 */
export const doFetchRolePermissions = createAction(type('[Auth] Do Fetch Role Permissions'), props<{ id: string, requestCriteria: RequestCriteria<PermissionSearch> }>());
export const doFetchRolePermissionsSuccess = createAction(type('[Auth] Do Fetch Role Permissions Success'), props<{ permissions: Permission[] }>());
export const doFetchRolePermissionsFail = createAction(type('[Auth] Do Fetch Role Permissions Fail'), props<{ error: any }>());

/**
 * Fetch User Permissions Actions
 */
export const doFetchUserPermissions = createAction(type('[Auth] Do Fetch User Permissions'), props<{ id: string, requestCriteria: RequestCriteria<PermissionSearch> }>());
export const doFetchUserPermissionsSuccess = createAction(type('[Auth] Do Fetch User Permissions Success'), props<{ permissions: Permission[] }>());
export const doFetchUserPermissionsFail = createAction(type('[Auth] Do Fetch User Permissions Fail'), props<{ error: any }>());


/**
 * Attach Permission Actions
 */
export const doAttachPermission = createAction(type('[Auth] Do Attach Permission'), props<{ permForm: RolePermissions }>());
export const doAttachPermissionSuccess = createAction(type('[Auth] Do Attach Permission Success'));
export const doAttachPermissionFail = createAction(type('[Auth] Do Attach Permission Fail'), props<{ error: any }>());

/**
 * Attach User Permission Actions
 */
export const doAttachUserPermission = createAction(type('[Auth] Do Attach User Permission'), props<{ permForm: RolePermissions }>());
export const doAttachUserPermissionSuccess = createAction(type('[Auth] Do Attach User Permission Success'));
export const doAttachUserPermissionFail = createAction(type('[Auth] Do Attach User Permission Fail'), props<{ error: any }>());

/**
 * Detach Permission Actions
 */
export const doDetachPermission = createAction(type('[Auth] Do Detach Permission'), props<{ permForm: RolePermissions }>());
export const doDetachPermissionSuccess = createAction(type('[Auth] Do Detach Permission Success'));
export const doDetachPermissionFail = createAction(type('[Auth] Do Detach Permission Fail'), props<{ error: any }>());

/**
 * Detach User Permission Actions
 */
export const doDetachUserPermission = createAction(type('[Auth] Do Detach User Permission'), props<{ permForm: RolePermissions }>());
export const doDetachUserPermissionSuccess = createAction(type('[Auth] Do Detach User Permission Success'));
export const doDetachUserPermissionFail = createAction(type('[Auth] Do Detach User Permission Fail'), props<{ error: any }>());


/**
 * Sync Permission Actions
 */
export const doSyncPermissions = createAction(type('[Auth] Do Sync Permissions'), props<{ permForm: RolePermissions }>());
export const doSyncPermissionsSuccess = createAction(type('[Auth] Do Sync Permissions Success'));
export const doSyncPermissionsFail = createAction(type('[Auth] Do Sync Permissions Fail'), props<{ error: any }>());
