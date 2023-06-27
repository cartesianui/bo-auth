import {AfterViewInit, ChangeDetectionStrategy, Component, Injector, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '@cartesianui/common';
import {RequestCriteria} from '@cartesianui/core';
import {AuthorizationSandbox} from '../../../authorization.sandbox';
import {Permission, Role, SearchPermissionForm, SearchRoleForm} from '../../../models';

@Component({
  selector: 'auth-role',
  templateUrl: './role.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RoleComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  id: string;
  role: Role;
  permissionsToAttach: Permission[] = [];
  permissionsToRevoke: Permission[] = [];
  lookupOptions: Permission[] = [];

  roleCriteria = new RequestCriteria<SearchRoleForm>(new SearchRoleForm()).with('permissions');
  permissionCriteria = new RequestCriteria<SearchPermissionForm>(new SearchPermissionForm()).limit(500);

  roleFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  });

  constructor(injector: Injector, protected _sandbox: AuthorizationSandbox) {
    super(injector);
  }

  // -----------------------------------------------------------------------
  //                          Event Binding
  // -----------------------------------------------------------------------

  ngAfterViewInit(): void {
    this.addSubscriptions();
    this.loadRole();
    this.loadPermissions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  onCbClick(event) {
    this.permissionsToRevoke = [...event.selected];
  }

  // -----------------------------------------------------------------------
  //                              Actions
  // -----------------------------------------------------------------------

  addSubscriptions() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.id = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFetchData$.subscribe((role: Role) => {
        if (role) {
          this.role = role;
          // console.log(this.role.permissions);
          // this.role.permissions = role.permissions.data.map( permission => permission.name);
          // console.log(this.role);
          this.roleFormGroup.patchValue(this.role);
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((permissions: Permission[]) => {
        this.lookupOptions = permissions;
      })
    );
  }

  loadRole() {
    this._sandbox.fetchRoleById(this.id, this.roleCriteria);;
  }

  loadPermissions() {
    this._sandbox.fetchPermissions(this.permissionCriteria);
  }

  save() {
    // if (this.permissionsLoading || this.loading) {
    //   this.notify.warn('Please wait for the loading to finish', 'Warning!');
    // }
    // if (this.isPermissionListChanged()) {
    //   // this.updatePermission();
    //   this.notify.info('Updating Permissions');
    // } else {
    //   this.notify.info('No changes to update!');
    // }
  }

  revoke() {
    //   if (this.selectedPermissions.length > 0) {
    //     let deletions = 0;
    //     this.rolePermissions = this.rolePermissions.filter((perm) => {
    //       const res = this.selectedPermissions.indexOf(perm) === -1;
    //       if (!res) {
    //         deletions += 1;
    //       }
    //       return res;
    //     });
    //     this.selectedPermissions = [];
    //     // this.resetValidators();
    //   }
  }

  attach() {
    //   const permsIds = this.rolePermissions.map((perm) => perm.id);
    //   const form = new RolePermissions({
    //     roleId: this.id,
    //     permissionsIds: permsIds
    //   });
    //   this._sandbox.syncPermissionsOnRole(form);
  }

  // -----------------------------------------------------------------------
  //                                 Helpers
  // -----------------------------------------------------------------------

  getFormClasses(controlName: string): string {
    // const control = this.formGroup.controls[controlName];
    // if (control.value === '') {
    //   return '';
    // }
    // if (control.valid) {
    //   return 'is-valid';
    // } else if (control.dirty && control.touched) {
    //   return 'is-invalid';
    // }

    return '';
  }

  getPermissionByName(permName: string, perms: Permission[]) {
    // let perm: Permission;
    // perms.every((p: Permission) => {
    //   if (p.name === permName) {
    //     perm = p;
    //     return false;
    //   }
    //   return true;
    // });
    // return perm;
  }

  isPermissionListChanged() {
    // return !ListHelper.compareListData(this.role.permissions.data, this.rolePermissions, 'id');
  }
}
