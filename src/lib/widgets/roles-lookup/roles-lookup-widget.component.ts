import { Component, Injector, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role, RoleSearch } from '../../models';

@Component({
  selector: 'roles-lookup',
  templateUrl: './roles-lookup-widget.component.html'
})
export class RolesLookupWidgetComponent extends ListingControlsComponent<Role, RoleSearch> implements OnInit {
  @Input() ignoreOptions: Array<Role> = [];

  constructor(
    injector: Injector,
    protected sb: AuthorizationSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(RoleSearch).limit(100000);
  }

  list(): void {
    this.sb.fetchRoles(this.criteria);
  }
}
