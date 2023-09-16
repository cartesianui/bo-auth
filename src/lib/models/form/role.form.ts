import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRole, Role } from '../domain';

export class RoleForm extends Role implements IRole {
  constructor(data?: IRole) {
    super(data);
  }

  createForm() {
    const formControls = {};

    Object.entries(this).map(([k,v], i) => {
      formControls[k] = new FormControl(v, []);
    })

    return new FormGroup(formControls);
  }
}