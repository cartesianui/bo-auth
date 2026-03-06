import { BaseModel, EntityMeta } from '@cartesianui/common';

export interface IPermission {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
}

@EntityMeta({
  search: {
    id: { column: 'id', operator: '=', value: null, options: { url: false} },
    name: { column: 'name', operator: '=', value: null },
    guardName: { column: 'guard_name', operator: '=', value: "api", options: { url: false} }
  }
})
export class Permission extends BaseModel implements IPermission {
  public id: string;
  public name: string;
  public description: string;
  public displayName: string;

  constructor(data?: IPermission) {
    super(data);
  }

}
