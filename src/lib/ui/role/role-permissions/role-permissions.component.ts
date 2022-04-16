import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission, SearchPermissionForm } from '../../../models';

@Component({
  selector: 'role-permissions',
  templateUrl: './role-permissions.component.html'
})
export class RolePermissionsComponent extends ListingControlsComponent<Permission, SearchPermissionForm> {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  constructor(injector: Injector, private _sandbox: AuthorizationSandbox) {
    super(injector);
  }

  protected delete(): void {}

  protected list(): void {}

  protected registerEvents(): void {}
}
