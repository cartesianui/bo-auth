import { AfterViewInit, Component, Injector, OnDestroy, OnInit, Input } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role, SearchRoleForm } from '../../models';

@Component({
  selector: 'auth-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent extends ListingControlsComponent<Role, SearchRoleForm> implements OnInit, AfterViewInit, OnDestroy {

  @Input() user: string =  null;

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(SearchRoleForm);
    this.addSubscriptions();
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this._sandbox.rolesFetchData$.subscribe((data: Role[]) => {
        this.data = data;
        this.completeLoading();
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

  list(): void {
    this.startLoading();
    if(this.user) {
      this._sandbox.fetchUserRoles(this.user, this.criteria);
    } else {
      this._sandbox.fetchRoles(this.criteria);
    }
  }

  search() {
    this.setPage(1);
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  create() {
    this.router.navigateByUrl('/authorization/roles/create')
  }

  delete() {}

  onActivate(event) {}
}
