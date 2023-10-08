import { Component, Injector } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { Permission, PermissionSearch } from '../../models';

@Component({
  selector: 'permissions-list',
  templateUrl: './permissions-widget.component.html'
})
export class PermissionsWidgetComponent extends ListingControlsComponent<Permission, PermissionSearch> {
  constructor(injector: Injector) {
    super(injector);
  }

  list(): void {}
}
