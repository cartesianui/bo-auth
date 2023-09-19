import { Action, createReducer, on } from '@ngrx/store';
import * as roleActions from './role.action';
import { RolesState } from './auth.state';

const INITIAL_STATE: RolesState = {
  loading: false,
  loaded: false,
  failed: false,
  data: {
    data: [],
    meta: null
  }
};

const createRoleReducers = createReducer(
  INITIAL_STATE,
  on(roleActions.doCreateRoleSuccess, (state, data) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: { data: [...state.data.data, data.role], meta: state.data.meta}
    })
  ),
  on(roleActions.doFetchRoles, roleActions.doFetchUserRoles,(state) =>
    Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false
    })
  ),
  on(roleActions.doFetchRolesSuccess, roleActions.doFetchUserRolesSuccess,(state, { roles }) =>
    Object.assign({}, state, {
      loading: false,
      loaded: true,
      failed: false,
      data: roles
    })
  ),
  on(roleActions.doFetchRolesFail, roleActions.doFetchUserRolesFail,(state) =>
    Object.assign({}, INITIAL_STATE, {
      failed: true
    })
  )
);

export const reducer = (state: RolesState | undefined, action: Action) => {
  return createRoleReducers(state, action);
};
