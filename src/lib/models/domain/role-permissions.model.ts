import { ParentModel } from '@cartesianui/common';

interface IRolePermissions {
  id?: string | undefined;
  roleId: string;
  permissionsIds: string[];
}

export class RolePermissions extends ParentModel implements IRolePermissions {
  id: string;
  roleId: string;
  permissionsIds: string[];

  constructor(data?: IRolePermissions) {
    super(data);
  }
}
