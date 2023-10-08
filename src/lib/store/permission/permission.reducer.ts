import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Permission } from '../../models';
import { PermissionActions } from './permission.actions';
import { EntityStateExtended, updateMetaState } from '@cartesianui/common';

export const permissionsFeatureKey = 'permissions';

export interface PermissionState extends EntityStateExtended<Permission> {
  selected: Permission | null;
}

export const adapter: EntityAdapter<Permission> = createEntityAdapter<Permission>();

export const initialState: PermissionState = adapter.getInitialState({
  selected: null,
  meta: null,
  loading: false,
  loaded: false,
  failed: false
});

export const reducer = createReducer(
  initialState,
  on(PermissionActions.selectPermission, (state, { permission }) => {
    return { ...state, selected: permission };
  }),
  on(PermissionActions.addPermission, (state, action) => adapter.addOne(action.permission, state)),
  on(PermissionActions.upsertPermission, (state, action) => adapter.upsertOne(action.permission, state)),
  on(PermissionActions.addPermissions, (state, action) => adapter.addMany(action.permission, state)),
  on(PermissionActions.upsertPermissions, (state, action) => adapter.upsertMany(action.permission, state)),
  on(PermissionActions.updatePermission, (state, action) => adapter.updateOne(action.permission, state)),
  on(PermissionActions.updatePermissions, (state, action) => adapter.updateMany(action.permissions, state)),
  on(PermissionActions.deletePermission, (state, action) => adapter.removeOne(action.id, { ...state, meta: { ...updateMetaState(state.meta, 'delete') } })),
  on(PermissionActions.deletePermissions, (state, action) => adapter.removeMany(action.ids, state)),
  on(PermissionActions.loadPermissions, (state, action) => adapter.setAll(action.permissions, { ...state, meta: action.meta, loaded: true })),
  on(PermissionActions.clearPermissions, (state) => adapter.removeAll(state))
);

export const permissionsFeature = createFeature({
  name: permissionsFeatureKey,
  reducer,
  extraSelectors: ({ selectPermissionsState }) => ({
    ...adapter.getSelectors(selectPermissionsState),
    meta: createSelector(selectPermissionsState, (state: PermissionState) => state.meta),
    selected: createSelector(selectPermissionsState, (state: PermissionState) => state.selected),
    loading: createSelector(selectPermissionsState, (state: PermissionState) => state.loaded),
    loaded: createSelector(selectPermissionsState, (state: PermissionState) => state.loaded),
    failed: createSelector(selectPermissionsState, (state: PermissionState) => state.failed),
    entities: createSelector(selectPermissionsState, (state: PermissionState) => Object.values(state.entities))
  })
});

export const { selectIds, selectEntities, selectAll, selectTotal, meta, entities, selected } = permissionsFeature;
