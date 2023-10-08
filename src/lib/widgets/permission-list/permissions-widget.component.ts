import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission, PermissionSearch } from '../../models';

@Component({
  selector: 'permissions-list',
  templateUrl: './permissions-widget.component.html'
})
export class PermissionsWidgetComponent extends ListingControlsComponent<Permission, PermissionSearch> implements OnInit, AfterViewInit, OnDestroy {

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.addSubscriptions();
  }
  
  addSubscriptions = () => {};

  list(): void {}

  search() {}

  onDelete() {}

  onActivate(event) {}
}
