import { Component, Injector, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role } from '../../models';
import { FORM_IMPORTS } from '../../authorization.imports';

@Component({
    selector: 'roles-lookup',
    exportAs: 'roles-lookup',
    templateUrl: './roles-lookup-widget.component.html',
    imports: [...FORM_IMPORTS],
    standalone: true
})
export class RolesLookupWidgetComponent extends ListingControlsComponent<Role> implements OnInit {
  @Input() ignoreOptions: Array<Role> = [];

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
    this.sb.fetchRoles(this.criteria.toHttpParams());
  }
}
