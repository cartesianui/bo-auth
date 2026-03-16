import { BaseModel, EntityMeta } from '@cartesianui/common';
import { Validators } from '@angular/forms';

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
  list: [
    { key: 'name', label: 'Name', opt: { link: true } },
    { key: 'displayName', label: 'Display Name', opt: {} },
    { key: 'description', label: 'Description', opt: {} },
  ],
  form: [
    { key: 'name', label: 'Name', opt: { validators: [Validators.required, Validators.maxLength(255)] } },
    { key: 'displayName', label: 'Display Name', opt: {} },
    { key: 'description', label: 'Description', opt: {} },
  ],
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
