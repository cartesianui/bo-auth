import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Role } from '../../models';
import { RoleActions } from './role.actions';
import { EntityStateExtended, updateMetaState } from '@cartesianui/common';

export const rolesFeatureKey = 'roles';

export interface RoleState extends EntityStateExtended<Role> {
  selected: Role | null;
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>();

export const initialState: RoleState = adapter.getInitialState({
  selected: null,
  meta: null,
  loading: false,
  loaded: false,
  failed: false
});

export const reducer = createReducer(
  initialState,
  on(RoleActions.selectRole, (state, { role }) => {
    return { ...state, selected: role };
  }),
  on(RoleActions.addRole, (state, action) => adapter.addOne(action.role, state)),
  on(RoleActions.upsertRole, (state, action) => adapter.upsertOne(action.role, state)),
  on(RoleActions.addRoles, (state, action) => adapter.addMany(action.role, state)),
  on(RoleActions.upsertRoles, (state, action) => adapter.upsertMany(action.role, state)),
  on(RoleActions.updateRole, (state, action) => adapter.updateOne(action.role, state)),
  on(RoleActions.updateRoles, (state, action) => adapter.updateMany(action.roles, state)),
  on(RoleActions.deleteRole, (state, action) => adapter.removeOne(action.id, { ...state, meta: { ...updateMetaState(state.meta, 'delete') } })),
  on(RoleActions.deleteRoles, (state, action) => adapter.removeMany(action.ids, state)),
  on(RoleActions.loadRoles, (state, action) => adapter.setAll(action.roles, { ...state, meta: action.meta, loaded: true })),
  on(RoleActions.clearRoles, (state) => adapter.removeAll(state))
);

export const rolesFeature = createFeature({
  name: rolesFeatureKey,
  reducer,
  extraSelectors: ({ selectRolesState }) => ({
    ...adapter.getSelectors(selectRolesState),
    meta: createSelector(selectRolesState, (state: RoleState) => state.meta),
    selected: createSelector(selectRolesState, (state: RoleState) => state.selected),
    loading: createSelector(selectRolesState, (state: RoleState) => state.loaded),
    loaded: createSelector(selectRolesState, (state: RoleState) => state.loaded),
    failed: createSelector(selectRolesState, (state: RoleState) => state.failed),
    entities: createSelector(selectRolesState, (state: RoleState) => Object.values(state.entities))
  })
});

export const { selectIds, selectEntities, selectAll, selectTotal, meta, entities, selected } = rolesFeature;
