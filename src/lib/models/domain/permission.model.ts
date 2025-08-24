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

  static override get searchForm() {
    return {
      id: { column: 'id', operator: '=', value: null, options: { url: false} },
      name: { column: 'name', operator: '=', value: null },
      guardName: { column: 'guard_name', operator: '=', value: "api", options: { url: false} }
    };
  }
}
