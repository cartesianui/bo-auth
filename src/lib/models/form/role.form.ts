import { FormControl, FormGroup } from '@angular/forms';
import { IRole, Role } from '../domain';

export class RoleForm extends Role implements IRole {
  constructor(data?: IRole) {
    super(data);
  }

  create(patch?): FormGroup {
    const formControls = {};

    Object.entries(this).map(([k, v], i) => {
      formControls[k] = new FormControl(v, []);
    });

    const formGroup = new FormGroup(formControls);
    if (patch) {
      formGroup.patchValue(patch);
    }

    return formGroup;
  }
}
