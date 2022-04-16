import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@cartesianui/common';
import { RequestCriteria } from '@cartesianui/ng-axis';
import { Subscription } from 'rxjs';
import { ListHelper } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role, Permission, RolePermissions, SearchPermissionForm, SearchRoleForm } from '../../models';

@Component({
  selector: 'auth-role',
  templateUrl: './role.component.html'
})
export class RoleComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('detailCard') detailCard: ElementRef;

  roleId: string;
  role;
  loaded;
  loading;
  failed;
  roleCriteria = new RequestCriteria<SearchRoleForm>(new SearchRoleForm()).with('permissions');

  selectedPermissions: Permission[] = [];
  allPermissions: Permission[] = [];
  rolePermissions: Permission[] = [];

  permissionsLoading: boolean;
  permissionsLoaded: boolean;
  permissionsFailed: boolean;
  permissionLoading: boolean;
  permissionLoaded: boolean;
  permissionFailed: boolean;
  permissionCriteria = new RequestCriteria<SearchPermissionForm>(new SearchPermissionForm());

  subscriptions: Subscription[] = [];

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  });

  constructor(injector: Injector, protected route: ActivatedRoute, private cdr: ChangeDetectorRef, protected _sandbox: AuthorizationSandbox) {
    super(injector);
  }

  ngAfterViewInit(): void {
    this.registerEvents();
    this._sandbox.fetchRoleById(this.roleId, this.roleCriteria);
    this.fetchPermissions();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.roleId = params.id;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFetchData$.subscribe((role: Role) => {
        if (role) {
          this.role = role;
          this.formGroup.patchValue(this.role);
          this.rolePermissions = role.permissions.data;
        }
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFetchData$.subscribe((permissions: Permission[]) => {
        this.allPermissions = permissions;
        // if (this.role) {
        //   this.resetValidators();
        // }
      })
    );
    this.subscriptions.push(
      this._sandbox.roleLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.failed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsLoading$.subscribe((loading) => {
        if (loading) {
          this.ui.setBusy(this.detailCard.nativeElement);
        }
        this.permissionsLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.permissionsLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionsFailed$.subscribe((failed) => {
        if (failed) {
          this.ui.clearBusy(this.detailCard.nativeElement);
        }
        this.permissionsFailed = failed;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoading$.subscribe((loading) => {
        if (loading && this.permissionLoading !== undefined) {
          this.notify.info('Updating permissions');
        }
        this.permissionLoading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoaded$.subscribe((loaded) => {
        if (loaded && this.permissionLoaded !== undefined) {
          this.notify.success('Permissions updated', 'Success!');
        }
        this.permissionLoaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFailed$.subscribe((failed) => {
        if (failed && this.permissionFailed !== undefined) {
          this.notify.error('Could not update permissions', 'Error!');
        }
        this.permissionFailed = failed;
      })
    );
  }

  save() {
    if (this.permissionsLoading || this.loading) {
      this.notify.warn('Please wait for the loading to finish', 'Warning!');
    }
    if (this.isPermissionListChanged()) {
      this.updatePermission();
      this.notify.info('Updating Permissions');
    } else {
      this.notify.info('No changes to update!');
    }
  }

  isPermissionListChanged(): boolean {
    return !ListHelper.compareListData(this.role.permissions.data, this.rolePermissions, 'id');
  }

  fetchPermissions() {
    this._sandbox.fetchPermissions(this.permissionCriteria);
  }

  addPermission(event) {
    console.log(event);
    // const n = this.control.value;
    // this.addItem(this.getPermissionByName(n, this.allPermissions));
    // this.cdr.detectChanges();
  }

  updatePermission() {
    const permsIds = this.rolePermissions.map((perm) => perm.id);
    const form = new RolePermissions({
      roleId: this.roleId,
      permissionsIds: permsIds
    });
    this._sandbox.syncPermissionsOnRole(form);
  }

  getPermissionByName(permName: string, perms: Permission[]): Permission {
    let perm: Permission;
    perms.every((p: Permission) => {
      if (p.name === permName) {
        perm = p;
        return false;
      }
      return true;
    });
    return perm;
  }

  revokePermissions() {
    if (this.selectedPermissions.length > 0) {
      let deletions = 0;
      this.rolePermissions = this.rolePermissions.filter((perm) => {
        const res = this.selectedPermissions.indexOf(perm) === -1;
        if (!res) {
          deletions += 1;
        }
        return res;
      });
      this.selectedPermissions = [];
      // this.resetValidators();
    }
  }

  updateSelectedPermissions(event) {
    this.selectedPermissions.push(...event.selected);
  }

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
}
