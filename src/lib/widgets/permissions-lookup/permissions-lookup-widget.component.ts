import { Component, Injector, Input, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission } from '../../models';

@Component({
    selector: 'permissions-lookup',
    templateUrl: './permissions-lookup-widget.component.html',
    standalone: false
})
export class PermissionsLookupWidgetComponent extends ListingControlsComponent<Permission> implements OnInit {
  @Input() ignoreOptions: Array<Permission> = [];

  constructor(
    injector: Injector,
    protected sb: AuthorizationSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria().limit(100000);
  }

  list(): void {
    this.sb.fetchPermissions(this.criteria);
  }
}
