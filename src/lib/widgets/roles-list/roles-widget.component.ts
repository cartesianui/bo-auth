import { Component, Injector } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { Role, RoleSearch } from '../../models';

@Component({
  selector: 'roles-list',
  templateUrl: './roles-widget.component.html'
})
export class RolesWidgetComponent extends ListingControlsComponent<Role, RoleSearch> {
  constructor(injector: Injector) {
    super(injector);
  }

  list(): void {}
}
