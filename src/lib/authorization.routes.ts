// bookeeper.routes.ts template
import { Routes } from '@angular/router';

import { provideAuthorizationFeature } from './authorization.providers';
import { EntryComponent } from './entry.component';
import { RolesComponent } from './components/role/roles.component';
import { PermissionsComponent } from './components/permission/permissions.component';

export const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    providers: [provideAuthorizationFeature()],
    children: [
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        }
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: 'Permissions'
        }
      }
    ]
  }
  /* STUB_CONTENT */
];
