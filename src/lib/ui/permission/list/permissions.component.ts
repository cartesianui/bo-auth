import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission, SearchPermissionForm } from '../../../models';

@Component({
  selector: 'auth-permissions',
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent extends ListingControlsComponent<Permission, SearchPermissionForm> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;

  searchText = '';

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  registerEvents = () => {
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((data: Permission[]) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
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

  ngOnInit(): void {
    this.initRequestCriteria(SearchPermissionForm);
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  search() {
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchPermissions(this.criteria);
  }

  protected delete() {}

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}
}
