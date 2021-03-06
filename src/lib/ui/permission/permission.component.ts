import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Permission } from '../../models';

@Component({
  selector: 'auth-permission',
  templateUrl: './permission.component.html'
})
export class PermissionComponent extends BaseComponent implements OnDestroy {
  permission: Permission = null;

  loading: boolean;
  loaded: boolean;
  failed: boolean;

  constructor(private _sandbox: AuthorizationSandbox, private route: ActivatedRoute, injector: Injector) {
    super(injector);
    this.registerEvents();
  }

  ngOnDestroy() {
    this.unregisterEvents();
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.fetchPerm(params.id);
      })
    );
    this.subscriptions.push(
      this._sandbox.permissionFetchData$.subscribe((data: Permission) => {
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

  fetchPerm = (id: string) => {
    this._sandbox.fetchPermissionById(id);
  };
}
