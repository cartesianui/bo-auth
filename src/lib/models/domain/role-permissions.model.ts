import { ParentModel } from '@cartesianui/common';

interface IRolePermissions {
  id?: string | undefined;
  roleId: string;
  permissionIds: string[];
}

export class RolePermissions extends ParentModel implements IRolePermissions {
  id: string;
  roleId: string;
  permissionIds: string[];

  constructor(data?: IRolePermissions) {
    super(data);
  }
}
