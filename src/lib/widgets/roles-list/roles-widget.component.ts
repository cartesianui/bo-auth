import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role, RoleSearch } from '../../models';

@Component({
  selector: 'roles-list',
  templateUrl: './roles-widget.component.html'
})
export class RolesWidgetComponent extends ListingControlsComponent<Role, RoleSearch> implements OnInit, AfterViewInit, OnDestroy {

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
