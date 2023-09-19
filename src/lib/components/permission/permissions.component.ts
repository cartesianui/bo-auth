import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission, SearchPermissionForm } from '../../models';

const permissionChildComponents = {
  permissionDetails: 'permissionDetails'
} as const;

type PermissionChildComponent = typeof permissionChildComponents;

@Component({
  selector: 'auth-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent extends ListingControlsComponent<Permission, SearchPermissionForm, PermissionChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  
  override childComponents: PermissionChildComponent = permissionChildComponents;

  constructor(
    protected _sandbox: AuthorizationSandbox,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(SearchPermissionForm);
    this.addSubscriptions();
  }

  addSubscriptions = () => {
    this.subscriptions.push(
      this._sandbox.permissionsData$.subscribe((data: Permission[]) => {
        this.data = data;
        this.completeLoading();
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsMetaData$.subscribe((meta: any) => {
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

  onDelete() {}

  onActivate(event) {}
}
