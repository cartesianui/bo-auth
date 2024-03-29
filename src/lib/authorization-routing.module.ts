import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './components/role/roles.component';
import { PermissionsComponent } from './components/permission/permissions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'roles'
  },
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
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule {}
