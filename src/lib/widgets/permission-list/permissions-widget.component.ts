import { Component, Injector } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { Permission } from '../../models';
import { LISTING_IMPORTS } from '../../authorization.imports';

@Component({
    selector: 'permissions-list',
    exportAs: 'permissions-list',
    templateUrl: './permissions-widget.component.html',
    imports: [...LISTING_IMPORTS],
    standalone: true
})
export class PermissionsWidgetComponent extends ListingControlsComponent<Permission> {
  constructor(injector: Injector) {
    super(injector);
  }

  list(): void {}
}
