import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { IRole, Role, RoleForm } from '../../../models';

@Component({
  selector: 'auth-create-role',
  templateUrl: './create-role.component.html'
})
export class RoleFormComponent extends FormBaseComponent<Role> implements OnInit, OnDestroy {

  constructor(
    injector: Injector,
    private _sandbox: AuthorizationSandbox
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.addSubscriptions();
    this.formGroup = new RoleForm({ name: '', displayName: '', description: '', guardName: 'api' }).createForm();
  }


  addSubscriptions() {
    this.subscriptions.push(
      this._sandbox.roleData$.subscribe((role: Role) => {
        if (role) {
          this.notify.success('Role successfully created', 'Success!');
          this.created.emit(role);
        }
      })
    );
  }

  save() {
    if (this.formGroup.valid) {
      this._sandbox.createRole(new Role(this.formGroup.value));
    }
  }
}
