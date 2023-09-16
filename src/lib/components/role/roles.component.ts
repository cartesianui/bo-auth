import { AfterViewInit, Component, Injector, OnDestroy, OnInit, Input, TemplateRef } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { IRole, Role, SearchRoleForm } from '../../models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

const roleChildComponents = {
  createRole: { id: 'createRole', title: "Create Role"},
  editRole: { id: 'editRole', title: "Edit Role"}
} as const;

type RoleChildComponent = typeof roleChildComponents;


@Component({
  selector: 'auth-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent extends ListingControlsComponent<IRole, SearchRoleForm, RoleChildComponent> implements OnInit, AfterViewInit, OnDestroy {

  @Input() user: string =  null;

  editRoleId: string | null = null;

  override childComponents: RoleChildComponent = roleChildComponents;

  modalRef?: BsModalRef;

  public collapsed = false;

  constructor(protected _sandbox: AuthorizationSandbox, injector: Injector, private modalService: BsModalService) {
    super(injector);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.initCriteria(SearchRoleForm);
    this.addSubscriptions();
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this._sandbox.rolesData$.subscribe((data: Role[]) => {
        this.data = data;
        this.completeLoading();
      })
    );
    this.subscriptions.push(
      this._sandbox.rolesMetaData$.subscribe((meta: any) => {
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

  delete() {
    this._sandbox.deleteRoleById(this.selected[0].id);
  }

  onActivate(event) {}


  onCreate(role: Role) {
    this.selected.push(role);
    this.showChildComponent(this.childComponents.editRole)
  }
}
