import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/ng-axis';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Role, SearchRoleForm } from '../../../models';

@Component({
  selector: 'auth-roles',
  templateUrl: './role.component.html'
})
export class RolesComponent extends ListingControlsComponent<Role, SearchRoleForm> implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dtContainer') dtContainer: ElementRef;
  searchModel = '';
  selectedRoles: Role[] = [];

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  registerEvents() {
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((data: Role[]) => {
        this.data = data;
        this.ui.clearBusy();
        this.isTableLoading = false;
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesFetchMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  ngOnInit(): void {
    this.criteria = new RequestCriteria<SearchRoleForm>(new SearchRoleForm());
    this.registerEvents();
  }

  ngAfterViewInit(): void {
    this.reloadTable();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  search() {
    this.setPage(1);
    if (this.searchModel) {
      this.criteria.where('name', 'like', this.searchModel);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  protected list(): void {
    this.ui.setBusy(this.dtContainer.nativeElement);
    this.isTableLoading = true;
    this._sandbox.fetchRoles(this.criteria);
  }

  delete() {}

  onSelect({ selected }) {
    this.selectedRoles.splice(0, this.selectedRoles.length);
    this.selectedRoles.push(...selected);
  }

  onActivate(event) {}
}
