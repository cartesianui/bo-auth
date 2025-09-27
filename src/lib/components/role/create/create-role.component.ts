import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Role, RoleForm } from '../../../models';

@Component({
    selector: 'auth-create-role',
    templateUrl: './create-role.component.html',
    standalone: false
})
export class RoleFormComponent extends FormBaseComponent<Role> implements OnInit, OnDestroy {
  constructor(
    injector: Injector,
    private sb: AuthorizationSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addSubscriptions();
    this.formGroup = new RoleForm({ name: '', displayName: '', description: '', guardName: 'api' }).create();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.createState$.subscribe(({ completed }) => {
        if (completed) {
          this.created.emit(true);
        }
      })
    );
  }

  save() {
    if (this.formGroup.valid) {
      this.sb.createRole(new Role(this.formGroup.value));
    }
  }
}
