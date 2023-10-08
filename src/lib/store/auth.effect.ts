import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IAxisResponse } from '@cartesianui/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttpService } from '../shared/auth-http.service';
import * as fromRoleActions from './role.action';
import * as fromPermissionActions from './permission.action';
import { RoleActions } from './role/role.actions';
import { PermissionActions } from './permission/permission.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private httpService: AuthHttpService
  ) {}

  fetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.fetchRoles),
      map((action) => action.criteria),
      switchMap((criteria) => this.httpService.fetchRoles(criteria).pipe(map((results: IAxisResponse) => RoleActions.loadRoles({ roles: results.data, meta: results.meta }))))
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.createRole),
      map(({role}) => role),
      switchMap((role) =>
        this.httpService.createRole(role).pipe(
          map((result) => RoleActions.selectRole({ role: result.data }))
          //catchError((error) => of(fromRoleActions.doCreateRoleFail(error)))
        )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.updateRole),
      map(({role}) => role),
      switchMap((role) =>
        this.httpService.updateRole(role.id as string, role.changes).pipe(
          map((result) => RoleActions.selectRole({ role: result.data }))
          //catchError((error) => of(fromRoleActions.doCreateRoleFail(error)))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.deleteRole),
      map((action) => action.id),
      switchMap(
        (id) => this.httpService.deleteRole(id)
        // .pipe(
        //   map(() => fromRoleActions.doDeleteRoleSuccess()),
        //   catchError((error) => of(fromRoleActions.doDeleteRoleFail(error)))
        // )
      )
    )
  );

  fetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.fetchPermissions),
      map((action) => action.criteria),
      switchMap((criteria) => this.httpService.fetchPermissions(criteria).pipe(map((results: IAxisResponse) => PermissionActions.loadPermissions({ permissions: results.data, meta: results.meta }))))
    )
  );

  syncPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.syncPermissions),
      map(({form}) => form),
      switchMap((form) =>
        this.httpService.syncPermissions(form).pipe(
          switchMap((result) => of(RoleActions.updateRole({ role: result.data }), RoleActions.selectRole({ role: result.data })))
          //catchError((error) => of(fromPermissionActions.doSyncPermissionsFail(error)))
        )
      )
    )
  );

  attachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.attachPermissions),
      map(({form}) => form),
      switchMap((form) =>
        this.httpService.attachPermission(form).pipe(
          switchMap((result) => of(RoleActions.updateRole({ role: result.data }), RoleActions.selectRole({ role: result.data })))
          // catchError((error) => of(fromPermissionActions.doAttachPermissionFail(error)))
        )
      )
    )
  );

  detachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.detachPermissions),
      map(({form}) => form),
      switchMap((form) =>
        this.httpService.detachPermission(form).pipe(
          switchMap((result) => of(RoleActions.updateRole({ role: result.data }), RoleActions.selectRole({ role: result.data })))
          //catchError((error) => of(fromPermissionActions.doDetachPermissionFail(error)))
        )
      )
    )
  );

  // fetchPermission$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPermissionActions.doFetchPermission),
  //     map((action) => action.id),
  //     switchMap((id) =>
  //       this.httpService.fetchPermission(id).pipe(
  //         map((result) =>
  //           fromPermissionActions.doFetchPermissionSuccess({
  //             permission: result.data
  //           })
  //         ),
  //         catchError((error) => of(fromPermissionActions.doFetchPermissionFail(error)))
  //       )
  //     )
  //   )
  // );

  // fetchRole$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromRoleActions.doFetchRole),
  //     map((action) => Object.assign({}, { id: action.id, criteria: action.criteria })),
  //     switchMap((data) =>
  //       this.httpService.fetchRole(data.id, data.criteria).pipe(
  //         map((result) => fromRoleActions.doFetchRoleSuccess({ role: result.data })),
  //         catchError((error) => of(fromRoleActions.doFetchRoleFail(error)))
  //       )
  //     )
  //   )
  // );

  // fetchUserRoles$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromRoleActions.doFetchUserRoles),
  //     map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
  //     switchMap((data) =>
  //       this.httpService.fetchUserRoles(data.id, data.criteria).pipe(
  //         map((results) => fromRoleActions.doFetchUserRolesSuccess({ roles: results })),
  //         catchError((error) => of(fromRoleActions.doFetchUserRolesFail(error)))
  //       )
  //     )
  //   )
  // );

  // attachUserPermission$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPermissionActions.doAttachPermission),
  //     map((action) => action.permForm),
  //     switchMap((permForm) =>
  //       this.httpService.attachUserPermission(permForm).pipe(
  //         map(() => fromPermissionActions.doAttachPermissionSuccess()),
  //         catchError((error) => of(fromPermissionActions.doAttachPermissionFail(error)))
  //       )
  //     )
  //   )
  // );

  // doDetachUserPermission$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPermissionActions.doDetachPermission),
  //     map((action) => action.permForm),
  //     switchMap((permForm) =>
  //       this.httpService.detachUserPermission(permForm).pipe(
  //         map(() => fromPermissionActions.doDetachPermissionSuccess()),
  //         catchError((error) => of(fromPermissionActions.doDetachPermissionFail(error)))
  //       )
  //     )
  //   )
  // );

  // doFetchUserPermissions$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPermissionActions.doFetchUserPermissions),
  //     map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
  //     switchMap((data) =>
  //       this.httpService.fetchUserPermissions(data.id, data.criteria).pipe(
  //         map((results) =>
  //           fromPermissionActions.doFetchUserPermissionsSuccess({
  //             permissions: results
  //           })
  //         ),
  //         catchError((error) => of(fromPermissionActions.doFetchUserPermissionsFail(error)))
  //       )
  //     )
  //   )
  // );

  // doFetchRolePermissions$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromPermissionActions.doFetchRolePermissions),
  //     map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
  //     switchMap((data) =>
  //       this.httpService.fetchRolePermissions(data.id, data.criteria).pipe(
  //         map((results) =>
  //           fromPermissionActions.doFetchRolePermissionsSuccess({
  //             permissions: results
  //           })
  //         ),
  //         catchError((error) => of(fromPermissionActions.doFetchRolePermissionsFail(error)))
  //       )
  //     )
  //   )
  // );

  // doAssignRole = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromRoleActions.doAssignRole),
  //     map((action) => action.roleForm),
  //     switchMap((roleForm) =>
  //       this.httpService.assignRole(roleForm).pipe(
  //         map(() => fromRoleActions.doAssignRoleSuccess()),
  //         catchError((error) => of(fromRoleActions.doAssignRoleFail(error)))
  //       )
  //     )
  //   )
  // );

  // doRevokeRole = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromRoleActions.doRevokeRole),
  //     map((action) => action.roleForm),
  //     switchMap((roleForm) =>
  //       this.httpService.revokeRole(roleForm).pipe(
  //         map(() => fromRoleActions.doRevokeRoleSuccess()),
  //         catchError((error) => of(fromRoleActions.doRevokeRoleFail(error)))
  //       )
  //     )
  //   )
  // );

  // doSyncRole$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fromRoleActions.doSyncRole),
  //     map((action) => action.roleForm),
  //     switchMap((roleForm) =>
  //       this.httpService.syncRole(roleForm).pipe(
  //         map(() => fromRoleActions.doSyncRoleSuccess()),
  //         catchError((error) => of(fromRoleActions.doSyncRoleFail(error)))
  //       )
  //     )
  //   )
  // );
}
