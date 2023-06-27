import { AfterViewInit, Component, Injector, OnDestroy, OnInit, Input } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission, SearchPermissionForm } from '../../models';

@Component({
  selector: 'auth-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent extends ListingControlsComponent<Permission, SearchPermissionForm> implements OnInit, AfterViewInit, OnDestroy {

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(SearchPermissionForm);
    this.addSubscriptions();
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addSubscriptions = () => {
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((data: Permission[]) => {
        this.data = data;
        this.completeLoading();
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFetchMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  };

  search() {
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  list(): void {
    this.startLoading();
    this._sandbox.fetchPermissions(this.criteria);
    return;
  }

  delete() {}

  onActivate(event) {}
}
