import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorizationSandbox } from './authorization.sandbox';
import { fromRole, RoleEffects } from './store/role';
import { fromPermission, PermissionEffects } from './store/permission';
import { RoleHttpService } from './shared/role/http.service';
import { PermissionHttpService } from './shared/permission/http.service';

export function provideAuthorizationRoot(): EnvironmentProviders {
  return makeEnvironmentProviders([
    RoleHttpService,
    PermissionHttpService,
  ]);
}

export function provideAuthorizationFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(
      StoreModule.forFeature(fromRole.featureKey, fromRole.reducer),
      StoreModule.forFeature(fromPermission.featureKey, fromPermission.reducer),
      EffectsModule.forFeature([RoleEffects, PermissionEffects]),
    ),
    AuthorizationSandbox,
    RoleHttpService,
    PermissionHttpService,
  ]);
}
