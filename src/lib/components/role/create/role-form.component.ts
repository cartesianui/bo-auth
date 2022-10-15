import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Role } from '../../../models';

@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html'
})
export class RoleFormComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required)
  });

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(injector: Injector, private _sandbox: AuthorizationSandbox) {
    super(injector);
  }

  ngOnInit(): void {
    this.addSubscriptions();
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this._sandbox.roleLoading$.subscribe((loading) => {
        if (loading && this.loading !== undefined) {
          this.notify.info('Creating Role');
        }
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded !== undefined) {
          this.notify.success('Role Created', 'Success!');
        }
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.roleFailed$.subscribe((failed) => {
        if (failed && this.failed !== undefined) {
          this.notify.error('Role creation failed', 'Error!');
        }
        this.failed = failed;
      })
    );
  }

  create() {
    if (this.formGroup.valid) {
      const form = new Role({
        name: this.formGroup.controls.name.value,
        description: this.formGroup.controls.description.value,
        displayName: this.formGroup.controls.displayName.value
      });
      this._sandbox.createRole(form);
    }
  }
  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.value === '') {
      return '';
    }
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }
}
