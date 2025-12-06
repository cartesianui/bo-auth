import { Component, Injector, AfterViewInit, inject } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission } from '../../../models';
import { FORM_IMPORTS } from '../../../authorization.imports';

@Component({
    selector: 'auth-permission-detail',
    templateUrl: './permission.component.html',
    imports: [...FORM_IMPORTS],
    standalone: true
})
export class PermissionComponent extends BaseComponent implements AfterViewInit {
  permission: Permission;

  protected sb = inject(AuthorizationSandbox);
  
  ngAfterViewInit() {
    this.addSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.selectedPermission$.subscribe((permission: Permission) => {
        this.permission = permission;
      })
    );
  }
}
