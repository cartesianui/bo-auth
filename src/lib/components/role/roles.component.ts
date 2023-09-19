import { AfterViewInit, Component, Injector, OnDestroy, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { IRole, Role, SearchRoleForm } from '../../models';

const childComponents = {
  createRole: { id: 'createRole', title: 'Create Role' },
  editRole: { id: 'editRole', title: 'Edit Role' }
} as const;

type ChildComponent = typeof childComponents;

@Component({
  selector: 'auth-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent extends ListingControlsComponent<IRole, SearchRoleForm, ChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  @Input() user: string = null;

  // editRoleId: string | null = null;

  override childComponents: ChildComponent = childComponents;

  constructor(
    protected sb: AuthorizationSandbox,
    injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(SearchRoleForm);
    this.addSubscriptions();
  }

  addSubscriptions() {
    // this.subscriptions.push(
    //   this.sb.rolesData$.subscribe((data: Role[]) => {
    //     this.data = [];

    //     this.cdr.detectChanges();
    //     this.data = [...data];
    //     // this.cdr.detectChanges();
    //     this.completeLoading();
    //   })
    // );
    // this.subscriptions.push(
    //   this._sandbox.roleData$.subscribe((data: Role) => {
    //     // console.log(data);
    //     this.data.push(data);
    //     this.data = [...this.data];
    //     this.completeLoading();
    //     //this.ref.markForCheck();
    //   })
    // );
    this.subscriptions.push(
      this.sb.rolesMetaData$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  list(): void {
    this.startLoading();
    
    if (this.user) {
      this.sb.fetchUserRoles(this.user, this.criteria);
    } else {
      this.sb.fetchRoles(this.criteria);
    }
  }

  onSearch() {
    this.setPage(1);
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  onDelete() {
    this.sb.deleteRoleById(this.selected[0].id);
  }

  onActivate(event) {}

  onCreate(role: Role) {
    // this.reload()
    this.selected.push(role);
    this.showChildComponent(this.childComponents.editRole);
  }
}
