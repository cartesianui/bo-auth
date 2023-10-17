import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission, PermissionSearch } from '../../models';

@Component({
  selector: 'permissions-lookup',
  templateUrl: './permissions-lookup-widget.component.html'
})
export class PermissionsLookupWidgetComponent extends ListingControlsComponent<Permission, PermissionSearch> implements OnInit {
  @Input() ignoreOptions: Array<Permission> = [];

  constructor(
    injector: Injector,
    protected sb: AuthorizationSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(PermissionSearch).limit(100000);
  }

  list(): void {
    this.sb.fetchPermissions(this.criteria);
  }
}
