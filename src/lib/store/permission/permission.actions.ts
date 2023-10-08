import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RequestCriteria } from '@cartesianui/core';

import { Permission, PermissionSearch } from '../../models';
import { ResponseMeta } from '@cartesianui/common';

export const PermissionActions = createActionGroup({
  source: 'Permission/API',
  events: {
    'Select Permission': props<{ permission: Permission }>(),
    'Create Permission': props<{ permission: Permission }>(),
    'Fetch Permissions': props<{ criteria: RequestCriteria<PermissionSearch> }>(),
    'Load Permissions': props<{ permissions: Permission[], meta: ResponseMeta }>(),
    'Add Permission': props<{ permission: Permission }>(),
    'Upsert Permission': props<{ permission: Permission }>(),
    'Add Permissions': props<{ permission: Permission[] }>(),
    'Upsert Permissions': props<{ permission: Permission[] }>(),
    'Update Permission': props<{ permission: Update<Permission> }>(),
    'Update Permissions': props<{ permissions: Update<Permission>[] }>(),
    'Delete Permission': props<{ id: string }>(),
    'Delete Permissions': props<{ ids: string[] }>(),
    'Clear Permissions': emptyProps(),
  }
});
