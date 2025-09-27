import { Component, Injector } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { Role } from '../../models';

@Component({
    selector: 'roles-list',
    templateUrl: './roles-widget.component.html',
    standalone: false
})
export class RolesWidgetComponent extends ListingControlsComponent<Role> {
  constructor(injector: Injector) {
    super(injector);
  }

  list(): void {}
}
