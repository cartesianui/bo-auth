import { ParentModel } from '@cartesianui/common';

export interface IPermission {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
}

export class Permission extends ParentModel implements IPermission {
  public id: string;
  public name: string;
  public description: string;
  public displayName: string;

  constructor(data?: IPermission) {
    super(data);
  }
}
