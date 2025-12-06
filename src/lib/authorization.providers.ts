import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders, Provider } from '@angular/core';
import { provideState, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';

import { AuthEffects } from './store/auth.effect';
import * as fromRole from './store/role/role.reducer';
import * as fromPermissions from './store/permission/permission.reducer';

import { AuthHttpService } from './shared/auth-http.service';
import { AuthorizationSandbox } from './authorization.sandbox';

export function provideAuthorizationRoot(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
};
  
export function provideAuthorizationFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(
      // CommonModule,
      // FormsModule,
      // ReactiveFormsModule,
      // CartesianCommonModule,
    ),
    importProvidersFrom(
      EffectsModule.forFeature([AuthEffects]),
      StoreModule.forFeature(fromRole.rolesFeatureKey, fromRole.reducer),
      StoreModule.forFeature(fromPermissions.permissionsFeatureKey, fromPermissions.reducer)
    ),
    AuthorizationSandbox,
    AuthHttpService,
  ]);
}