import { entityFeature } from '@cartesianui/common';
import { Permission } from '../../models';
import { PermissionActions } from './actions';

export const fromPermission = entityFeature<Permission>('permissions', PermissionActions);
