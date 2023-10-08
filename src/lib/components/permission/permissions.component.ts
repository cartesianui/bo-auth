import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission, PermissionSearch } from '../../models';

const permissionChildComponents = {
  permissionDetails: 'permissionDetails'
} as const;

type PermissionChildComponent = typeof permissionChildComponents;

@Component({
  selector: 'auth-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent extends ListingControlsComponent<Permission, PermissionSearch, PermissionChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  
  override childComponents: PermissionChildComponent = permissionChildComponents;

  constructor(
    protected sb: AuthorizationSandbox,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(PermissionSearch);
    this.addSubscriptions();
  }

  addSubscriptions = () => {
    this.subscriptions.push(
      this.sb.permissionsMetaData$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  };

  view(permission: Permission) {
    this.sb.selectPermission(permission);
    this.showChildComponent(this.childComponents.permissionDetails);
  }

  onSearch($event: { text: string }) {
    this.criteria.page(1);
    this.criteria.setSearchField('name', $event.text);
    this.appendSearchCriteriaToUrl();
    this.list();
  }

  list(): void {
    this.sb.fetchPermissions(this.criteria);
  }
}
