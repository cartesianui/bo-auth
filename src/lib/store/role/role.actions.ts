import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IError, RequestCriteria } from '@cartesianui/core';

import { Role, RoleSearch } from '../../models';
import { ResponseMeta } from '@cartesianui/common';
import { RolePermissions } from 'dist/bo-auth';

export const RoleActions = createActionGroup({
  source: 'Role/API',
  events: {
    'Load Roles': props<{ roles: Role[]; meta: ResponseMeta }>(),
    'Add Role': props<{ role: Role }>(),
    'Upsert Role': props<{ role: Role }>(),
    'Add Roles': props<{ role: Role[] }>(),
    'Upsert Roles': props<{ role: Role[] }>(),
    'Update Role': props<{ role: Update<Role> }>(),
    'Update Roles': props<{ roles: Update<Role>[] }>(),
    'Delete Role': props<{ id: string }>(),
    'Delete Roles': props<{ ids: string[] }>(),
    'Clear Roles': emptyProps(),
    // Custom
    'Select Role': props<{ role: Role }>(),
    'Create Role': props<{ role: Role }>(),
    'Create Success': props<{ role: Role }>(),
    'Create Failure': props<{ errors: IError, message: string }>(),
    'Update Success': props<{ role: Role }>(),
    'Update Failure': props<{ errors: IError, message: string }>(),
    'Fetch Roles': props<{ criteria: RequestCriteria<RoleSearch> }>(),
    'Sync Permissions': props<{ form: RolePermissions }>(),
    'Attach Permissions': props<{ form: RolePermissions }>(),
    'Detach Permissions': props<{ form: RolePermissions }>()
  }
});
