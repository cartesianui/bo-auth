import { Component, Injector } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { Permission } from '../../models';

@Component({
    selector: 'permissions-list',
    templateUrl: './permissions-widget.component.html',
    standalone: false
})
export class PermissionsWidgetComponent extends ListingControlsComponent<Permission> {
  constructor(injector: Injector) {
    super(injector);
  }

  list(): void {}
}
