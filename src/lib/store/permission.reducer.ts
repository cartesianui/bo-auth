import { Action, createReducer, on } from '@ngrx/store';
import * as permissionActions from './permission.action';
import { PermissionState } from './auth.state';

const INITIAL_STATE: PermissionState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null
};

const createPermissionReducers = createReducer(
  INITIAL_STATE,
  on(permissionActions.doAttachPermission, permissionActions.doDetachPermission, permissionActions.doAttachUserPermission, permissionActions.doDetachUserPermission, permissionActions.doFetchPermission, permissionActions.doSyncPermissions, (state) =>
    Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false
    })
  ),
  on(permissionActions.doAttachPermissionSuccess, permissionActions.doDetachPermissionSuccess, permissionActions.doSyncPermissionsSuccess, permissionActions.doAttachUserPermissionSuccess, permissionActions.doDetachUserPermissionSuccess,(state) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false
    })
  ),
  on(permissionActions.doAttachPermissionFail, permissionActions.doDetachPermissionFail, permissionActions.doFetchPermissionFail, permissionActions.doSyncPermissionsFail, permissionActions.doAttachUserPermissionFail, permissionActions.doDetachUserPermissionFail,(state) =>
    Object.assign({}, INITIAL_STATE, {
      failed: true
    })
  ),
  on(permissionActions.doFetchPermissionSuccess, (state, perm) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: perm.permission
    })
  )
);

export const reducer = (state: PermissionState | undefined, action: Action) => {
  return createPermissionReducers(state, action);
};
