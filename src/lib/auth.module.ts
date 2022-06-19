import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { RolesComponent } from './ui/role/list/roles.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { authFeatureKey, authReducers } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effect';
import { AuthHttpService } from './shared/auth-http.service';
import { AuthorizationSandbox } from './authorization.sandbox';
import { PermissionsComponent } from './ui/permission/list/permissions.component';
import { RoleComponent } from './ui/role/role.component';
import { RoleFormComponent } from './ui/role/create/role-form.component';
import { PermissionComponent } from './ui/permission/permission.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RolePermissionsComponent } from './ui/role/role-permissions/role-permissions.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [AuthorizationComponent, RolesComponent, RoleFormComponent, PermissionsComponent, RoleComponent, PermissionComponent, RolePermissionsComponent],
  imports: [
    CommonModule,
    CartesianCommonModule.forFeature(),
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TypeaheadModule,
    FormsModule,
    StoreModule.forFeature(authFeatureKey, authReducers),
    EffectsModule.forFeature([AuthEffects]),
    TabsModule.forRoot()
  ],
  providers: [AuthHttpService, AuthorizationSandbox]
})
export class AuthModule {}
