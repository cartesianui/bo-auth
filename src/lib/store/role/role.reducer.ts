import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { Role } from '../../models';
import { RoleActions } from './role.actions';
import { EntityStateExtended, requestCompleted, requestDefault, requestFailed, requestStarted, updateMetaState } from '@cartesianui/common';

export const rolesFeatureKey = 'roles';

export interface RoleState extends EntityStateExtended<Role> {
  selected: Role | null;
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>();

export const initialState: RoleState = adapter.getInitialState({
  selected: null,
  meta: null,
  request: requestDefault,
  creation: requestDefault,
  updation: requestDefault
});

export const reducer = createReducer(
  initialState,
  on(RoleActions.createRole, (state, { role }) => {
    return { ...state, creation: { ...requestStarted } };
  }),
  on(RoleActions.createSuccess, (state, { role }) => {
    return { ...state, selected: role, creation: { ...requestCompleted } };
  }),
  on(RoleActions.createFailure, (state, { errors, message }) => {
    return { ...state, creation: { ...requestFailed } };
  }),
  on(RoleActions.updateSuccess, (state, { role }) => {
    return { ...state, selected: role, updation: { ...requestCompleted } };
  }),
  on(RoleActions.updateFailure, (state, { errors, message }) => {
    return { ...state, updation: { ...requestFailed } };
  }),
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
  on(RoleActions.loadRoles, (state, action) => adapter.setAll(action.roles, { ...state, meta: action.meta, request: { ...requestCompleted } })),
  on(RoleActions.clearRoles, (state) => adapter.removeAll(state))
);

export const rolesFeature = createFeature({
  name: rolesFeatureKey,
  reducer,
  extraSelectors: ({ selectRolesState }) => ({
    ...adapter.getSelectors(selectRolesState),
    meta: createSelector(selectRolesState, (state: RoleState) => state.meta),
    selected: createSelector(selectRolesState, (state: RoleState) => state.selected),
    request: createSelector(selectRolesState, (state: RoleState) => state.request),
    creation: createSelector(selectRolesState, (state: RoleState) => state.creation),
    updation: createSelector(selectRolesState, (state: RoleState) => state.updation),
    entities: createSelector(selectRolesState, (state: RoleState) => Object.values(state.entities))
  })
});

export const { selectIds, selectEntities, selectAll, selectTotal, meta, entities, creation, selected } = rolesFeature;
