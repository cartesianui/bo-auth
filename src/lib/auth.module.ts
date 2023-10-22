import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { RolesComponent } from './components/role/roles.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { BoLayoutModule } from '@cartesianui/coreui';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effect';
import { AuthHttpService } from './shared/auth-http.service';
import { AuthorizationSandbox } from './authorization.sandbox';
import { PermissionsComponent } from './components/permission/permissions.component';
import { PermissionsWidgetComponent, RolesWidgetComponent, RolesLookupWidgetComponent, PermissionsLookupWidgetComponent } from './widgets';
import { RoleComponent } from './components/role/edit/role.component';
import { RoleFormComponent } from './components/role/create/create-role.component';
import { PermissionComponent } from './components/permission/detail/permission.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BadgeModule } from '@coreui/angular';
import * as fromRole from './store/role/role.reducer';
import * as fromPermissions from './store/permission/permission.reducer';

const components = [AuthorizationComponent, RolesComponent, RoleFormComponent, PermissionsComponent, RoleComponent, PermissionComponent];
const widgets = [PermissionsWidgetComponent, RolesWidgetComponent, RolesLookupWidgetComponent, PermissionsLookupWidgetComponent];

@NgModule({
  declarations: [...components, ...widgets],
  imports: [
    CommonModule,
    CartesianCommonModule.forFeature(),
    BoLayoutModule.forFeature(),
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TypeaheadModule,
    FormsModule,
    TabsModule.forRoot(),
    BadgeModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromRole.rolesFeatureKey, fromRole.reducer),
    StoreModule.forFeature(fromPermissions.permissionsFeatureKey, fromPermissions.reducer)
  ],
  exports: [...widgets],
  providers: [AuthHttpService, AuthorizationSandbox]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }

  static forFeature(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}
