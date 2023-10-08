import { createAction, props } from '@ngrx/store';
import { type, RequestCriteria } from '@cartesianui/core';
import { Role, RoleSearch } from '../models';

/**
 * Fetch Role Actions
 */
export const doFetchRole = createAction(type('[Auth] Do Fetch Role'), props<{ id: string; criteria: RequestCriteria<RoleSearch> }>());
export const doFetchRoleSuccess = createAction(type('[Auth] Do Fetch Role Success'), props<{ role: Role }>());
export const doFetchRoleFail = createAction(type('[Auth] Do Fetch Role Fail'), props<{ error: any }>());

/**
 * Fetch Role Actions
 */
export const doCreateRole = createAction(type('[Auth] Do Create Role'), props<{ form: Role }>());
export const doCreateRoleSuccess = createAction(type('[Auth] Do Create Role Success'), props<{ role: Role }>());
export const doCreateRoleFail = createAction(type('[Auth] Do Create Role Fail'), props<{ error: any }>());

/**
 * Fetch Roles Actions
 */
export const doFetchRoles = createAction(type('[Auth] Do Fetch Roles'), props<{ requestCriteria: RequestCriteria<RoleSearch> }>());
export const doFetchRolesSuccess = createAction(type('[Auth] Do Fetch Roles Success'), props<{ roles: Role[] }>());
export const doFetchRolesFail = createAction(type('[Auth] Do Fetch Roles Fail'), props<{ error: any }>());

/**
 * Fetch User Roles Actions
 */
export const doFetchUserRoles = createAction(type('[Auth] Do Fetch User Roles'), props<{ id: string, requestCriteria: RequestCriteria<RoleSearch> }>());
export const doFetchUserRolesSuccess = createAction(type('[Auth] Do Fetch User Roles Success'), props<{ roles: Role[] }>());
export const doFetchUserRolesFail = createAction(type('[Auth] Do Fetch User Roles Fail'), props<{ error: any }>());

/**
 * Delete Role Actions
 */
export const doDeleteRole = createAction(type('[Auth] Do Delete Role'), props<{ id: string }>());
export const doDeleteRoleSuccess = createAction(type('[Auth] Do Delete Role Success'));
export const doDeleteRoleFail = createAction(type('[Auth] Do Delete Role Fail'), props<{ error: any }>());

/**
 * Assign Role Actions
 */
export const doAssignRole = createAction(type('[Auth] Do Assign Role'), props<{ roleForm: any }>());
export const doAssignRoleSuccess = createAction(type('[Auth] Do Assign Role Success'));
export const doAssignRoleFail = createAction(type('[Auth] Do Assign Role Fail'), props<{ error: any }>());

/**
 * Revoke Role Actions
 */
export const doRevokeRole = createAction(type('[Auth] Do Revoke Role'), props<{ roleForm: any }>());
export const doRevokeRoleSuccess = createAction(type('[Auth] Do Revoke Role Success'));
export const doRevokeRoleFail = createAction(type('[Auth] Do Revoke Role Fail'), props<{ error: any }>());

/**
 * Sync Role Actions
 */
export const doSyncRole = createAction(type('[Auth] Do Sync Role'), props<{ roleForm: any }>());
export const doSyncRoleSuccess = createAction(type('[Auth] Do Sync Role Success'));
export const doSyncRoleFail = createAction(type('[Auth] Do Sync Role Fail'), props<{ error: any }>());

/**
 * Update Roles Actions
 */
export const doUpdateRole = createAction(type('[Auth] Do Update Roles'), props<{ updateForm: any }>());
export const doUpdateRoleSuccess = createAction(type('[Auth] Do Update Roles Success'));
export const doUpdateRoleFail = createAction(type('[Auth] Do Update Roles Fail'), props<{ error: any }>());
