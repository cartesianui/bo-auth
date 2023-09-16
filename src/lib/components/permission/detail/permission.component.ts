import { Component, Injector, Input, OnDestroy, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../../authorization.sandbox';
import { Permission } from '../../../models';

@Component({
  selector: 'auth-permission-detail',
  templateUrl: './permission.component.html'
})
export class PermissionComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {

  @Input() id: string
  permission: Permission;

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(injector: Injector, private _sandbox: AuthorizationSandbox,) {
    super(injector);
  }

  ngOnInit() {
    this.addSubscriptions();
  }

  ngOnChanges(): void {
    this._sandbox.fetchPermissionById(this.id);
  }

  addSubscriptions() {
    this.subscriptions.push(
      this._sandbox.permissionData$.subscribe((data: Permission) => {
        this.permission = data;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoading$.subscribe((loading) => {
        this.loading = loading;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionLoaded$.subscribe((loaded) => {
        this.loaded = loaded;
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFailed$.subscribe((failed) => {
        this.failed = failed;
      })
    );
  }
}
