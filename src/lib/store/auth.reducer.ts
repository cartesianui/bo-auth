import { ActionReducerMap } from '@ngrx/store';
import { reducer as rolesReducer } from './roles.reducer';
import { reducer as roleReducer } from './role.reducer';
import { reducer as permissionsReducer } from './permissions.reducer';
import { reducer as permissionReducer } from './permission.reducer';
import { AuthorizationState } from './auth.state';

export const authFeatureKey = 'authorization';

export const authReducers: ActionReducerMap<AuthorizationState> = {
  roles: rolesReducer,
  role: roleReducer,
  permissions: permissionsReducer,
  permission: permissionReducer
};
