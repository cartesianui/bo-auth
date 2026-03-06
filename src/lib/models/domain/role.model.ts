import { BaseModel, EntityMeta } from '@cartesianui/common';

export interface IRole {
  type?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  guardName?: string | undefined;
  description?: string | undefined;
  displayName?: string | undefined;
  level?: number | undefined;
  permissions?: any | undefined;
}

@EntityMeta({
  search: {
    id: { column: 'id', operator: '=', value: null, options: { url: false} },
    name: { column: 'name', operator: 'like', value: null },
    guardName: { column: 'guard_name', operator: '=', value: 'api', options: { url: false}}
  }
})
export class Role extends BaseModel implements IRole {
  type: string;
  id: string;
  name: string;
  guardName: string;
  description: string;
  displayName: string;
  level: number;
  permissions: any;

  constructor(data?: IRole) {
    super(data);
  }

}
