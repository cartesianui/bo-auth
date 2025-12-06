import { AfterViewInit, Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { IRole, Role } from '../../models';
import { LISTING_IMPORTS } from '../../authorization.imports';
import { RoleComponent } from './edit/role.component';
import { RoleFormComponent } from './create/create-role.component';

const childComponents = {
  createRole: { id: 'createRole', title: 'Create Role' },
  editRole: { id: 'editRole', title: 'Edit Role' }
} as const;

type ChildComponent = typeof childComponents;

@Component({
    selector: 'auth-roles',
    templateUrl: './roles.component.html',
    imports: [
      ...LISTING_IMPORTS,
      RoleComponent,
      RoleFormComponent
    ],
    standalone: true
})
export class RolesComponent extends ListingControlsComponent<IRole, ChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  override childComponents: ChildComponent = childComponents;

  protected sb = inject(AuthorizationSandbox);

  ngOnInit(): void {
    this.initCriteria().with('permissions');
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
    this.sb.fetchRoles(this.criteria.httpParams());
  }

  onSearch($event: { text: string }) {
    this.criteria.page(1);
    this.criteria.updateForm('name', $event.text);
    // this.appendSearchCriteriaToUrl();
    // this.list();
  }

  onDelete() {
    this.message.confirm('Are you sure you want to delete this record?', 'Confirm Deletion', (confirmed) => {
      if (confirmed) {
        this.sb.deleteRole(this.selected[0].id);
        this.selected = [];
      }
    });
  }

  override onCreated() {
    this.list();
    this.showChildComponent(this.childComponents.editRole, 'editRole');
  }

  edit(role: Role) {
    this.sb.selectRole(role);
    this.showChildComponent(this.childComponents.editRole, 'editRole');
  }
}
