import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';
import { RolesComponent } from './ui/role/list/roles.component';
import { PermissionsComponent } from './ui/permission/list/permissions.component';
import { RoleComponent } from './ui/role/role.component';
import { RoleFormComponent } from './ui/role/create/role-form.component';
import { PermissionComponent } from './ui/permission/permission.component';

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
        redirectTo: 'roles',
        pathMatch: 'full'
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles List'
        }
      },
      {
        path: 'roles/create',
        component: RoleFormComponent,
        data: {
          title: 'Create Roles'
        }
      },
      {
        path: 'roles/:id',
        component: RoleComponent,
        data: {
          title: 'Role Detail'
        }
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: 'Permissions List'
        }
      },
      {
        path: 'permissions/:id',
        component: PermissionComponent,
        data: {
          title: 'Permission Detail'
        }
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
