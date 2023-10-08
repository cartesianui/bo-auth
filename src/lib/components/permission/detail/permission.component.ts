import { Component, Injector, AfterViewInit } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission } from '../../../models';

@Component({
  selector: 'auth-permission-detail',
  templateUrl: './permission.component.html'
})
export class PermissionComponent extends BaseComponent implements AfterViewInit {
  permission: Permission;

  constructor(
    injector: Injector,
    private sb: AuthorizationSandbox
  ) {
    super(injector);
  }

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
