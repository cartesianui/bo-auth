import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { IRole, Role, RoleSearch } from '../../models';

const childComponents = {
  createRole: { id: 'createRole', title: 'Create Role' },
  editRole: { id: 'editRole', title: 'Edit Role' }
} as const;

type ChildComponent = typeof childComponents;

@Component({
  selector: 'auth-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent extends ListingControlsComponent<IRole, RoleSearch, ChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  override childComponents: ChildComponent = childComponents;

  constructor(
    protected sb: AuthorizationSandbox,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(RoleSearch);
    this.hydrateSearchCriteria();
    this.addSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.rolesMetaData$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  list(): void {
    this.sb.fetchRoles(this.criteria);
  }

  onSearch($event: { text: string }) {
    this.criteria.page(1);
    this.criteria.setSearchField('name', $event.text);
    this.appendSearchCriteriaToUrl();
    this.list();
  }

  onDelete() {
    this.message.confirm('Are you sure you want to delete this record?', 'Confirm Deletion', (confirmed) => {
      if (confirmed) {
        this.sb.deleteRole(this.selected[0].id);
        this.selected = [];
      }
    });
  }

  onCreated() {
    this.list();
    this.showChildComponent(this.childComponents.editRole);
  }

  edit(role: Role) {
    this.sb.selectRole(role);
    this.showChildComponent(this.childComponents.editRole);
  }
}
