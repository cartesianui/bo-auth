import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnDestroy } from '@angular/core';
import { FormBaseComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission, Role, RolePermissions, RoleForm } from '../../../models';

@Component({
    selector: 'auth-edit-role',
    templateUrl: './role.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})
export class RoleComponent extends FormBaseComponent<Role> implements AfterViewInit, OnDestroy {
  role: Role;
  permissionsToAttach: Permission[] = [];
  permissionsToRevoke: Permission[] = [];
  permissionLookupOptions: Permission[] = [];

  permissionCriteria = new RequestCriteria().limit(500);
  //permissionCriteria = new RequestCriteria<PermissionSearch>(new PermissionSearch()).limit(500);

  constructor(
    injector: Injector,
    protected sb: AuthorizationSandbox
  ) {
    super(injector);
    this.formGroup = new RoleForm({ name: '', displayName: '', description: '', guardName: 'api' }).create();
  }

  ngAfterViewInit(): void {
    this.addSubscriptions();
    this.loadPermissions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.selectedRole$.subscribe((role: Role) => {
        this.role = role;
        this.formGroup.patchValue(role);
      })
    );
    this.subscriptions.push(
      this.sb.permissionsData$.subscribe((permissions: Permission[]) => {
        this.permissionLookupOptions = permissions;
      })
    );
  }

  loadPermissions() {
    this.sb.fetchPermissions(this.permissionCriteria);
  }

  onSave() {
    if (this.formGroup.valid) {
      this.sb.updateRole(this.role.id, new Role(this.formGroup.value));
    }
  }

  onRevoke() {
    const permissionIds = this.permissionsToRevoke.map((permission) => permission.id);
    const form = new RolePermissions({
      roleId: this.role.id,
      permissionIds
    });
    this.sb.detachPermissions(this.role.id, form);
    this.permissionsToRevoke = [];
  }

  onAttach() {
    const permissionIds = this.permissionsToAttach.map((permission) => permission.id);
    const form = new RolePermissions({
      roleId: this.role.id,
      permissionIds
    });
    this.sb.attachPermissions(this.role.id, form);
    this.permissionsToAttach = [];
  }
}
