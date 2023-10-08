import { AfterViewInit, ChangeDetectionStrategy, Component, Injector, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent, FormBaseComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/core';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission, Role, RolePermissions, PermissionSearch, RoleSearch, RoleForm } from '../../../models';

@Component({
  selector: 'auth-edit-role',
  templateUrl: './role.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RoleComponent extends FormBaseComponent<Role> implements AfterViewInit, OnDestroy {
  // @Input() id: string;
  // @Input()
  role: Role;
  permissionsToAttach: Permission[] = [];
  permissionsToRevoke: Permission[] = [];
  permissionLookupOptions: Permission[] = [];

  permissionCriteria = new RequestCriteria<PermissionSearch>(new PermissionSearch()).limit(500);

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
    const permissionsIds = this.permissionsToRevoke.map((permission) => permission.id);
    const form = new RolePermissions({
      roleId: this.role.id,
      permissionsIds
    });
    this.sb.detachPermissions(form);
    this.permissionsToRevoke = [];
  }

  onAttach() {
    const permissionsIds = this.permissionsToAttach.map((permission) => permission.id);
    const form = new RolePermissions({
      roleId: this.role.id,
      permissionsIds
    });
    this.sb.attachPermissions(form);
    this.permissionsToAttach = [];
  }
}
