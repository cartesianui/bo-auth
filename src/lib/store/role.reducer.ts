import { Action, createReducer, on } from '@ngrx/store';
import * as fromRoleActions from './role.action';
import { RoleState } from './auth.state';

const INITIAL_STATE: RoleState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null
};

const createRoleReducers = createReducer(
  INITIAL_STATE,
  on(fromRoleActions.doFetchRole, fromRoleActions.doCreateRole, (state, data) =>
    Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false,
      data: null
    })
  ),
  on(fromRoleActions.doFetchRoleSuccess, fromRoleActions.doCreateRoleSuccess, (state, data) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: data.role
    })
  ),
  on(fromRoleActions.doAssignRole, fromRoleActions.doDeleteRole, fromRoleActions.doFetchRole, fromRoleActions.doCreateRole, (state) =>
    Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false
    })
  ),
  on(fromRoleActions.doAssignRoleSuccess, fromRoleActions.doDeleteRoleSuccess, (state) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false
    })
  ),
  on(fromRoleActions.doAssignRoleFail, fromRoleActions.doDeleteRoleFail, fromRoleActions.doCreateRoleFail, fromRoleActions.doFetchRoleFail, (state) =>
    Object.assign({}, INITIAL_STATE, {
      failed: true
    })
  )
);

export const reducer = (state: RoleState | undefined, action: Action) => {
  return createRoleReducers(state, action);
};
