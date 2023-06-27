import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';
import { RolesComponent } from './components/role/roles.component';
import { PermissionsComponent } from './components/permission/permissions.component';
import { RoleComponent } from './components/role/edit/role.component';
import { RoleFormComponent } from './components/role/create/role-form.component';
import { PermissionComponent } from './components/permission/form/permission.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    data: {
      title: 'Authorization'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'roles',
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        },
        children: [
          {
            path: ':id',
            component: RoleComponent,
            data: {
              title: 'Edit'
            }
          },
          {
            path: 'create',
            component: RoleFormComponent,
            data: {
              title: 'Create'
            }
          },
        ]
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: 'Permissions'
        },
        children: [
          {
            path: ':id',
            component: PermissionComponent,
            data: {
              title: 'Edit'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
