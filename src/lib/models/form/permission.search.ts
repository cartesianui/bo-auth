import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesianui/core';

@Injectable()
export class PermissionSearch {
  id: WhereItem = { column: 'id', operator: '=', value: null, options: { url: false} };
  name: WhereItem = { column: 'name', operator: '=', value: null };
  guardName: WhereItem = { column: 'guard_name', operator: '=', value: "api", options: { url: false} };
}
