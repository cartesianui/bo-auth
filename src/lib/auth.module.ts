import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { RolesComponent } from './components/role/roles.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { BoLayoutModule } from '@cartesianui/bo-layout';
import { authFeatureKey, authReducers } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effect';
import { AuthHttpService } from './shared/auth-http.service';
import { AuthorizationSandbox } from './authorization.sandbox';
import { PermissionsComponent } from './components/permission/permissions.component';
import { PermissionsWidgetComponent, RolesWidgetComponent } from "./widgets";
import { RoleComponent } from './components/role/edit/role.component';
import { RoleFormComponent } from './components/role/create/role-form.component';
import { PermissionComponent } from './components/permission/form/permission.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BadgeModule } from "@coreui/angular";

const components = [ AuthorizationComponent, RolesComponent, RoleFormComponent, PermissionsComponent, RoleComponent, PermissionComponent];
const widgets = [ PermissionsWidgetComponent, RolesWidgetComponent];

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
    StoreModule.forFeature(authFeatureKey, authReducers),
    EffectsModule.forFeature([AuthEffects]),
    TabsModule.forRoot(),
    BadgeModule
  ],
  exports: [
    ...widgets
  ],
  providers: [AuthHttpService, AuthorizationSandbox]
})
export class AuthModule {}
