import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttpService } from '../shared/auth-http.service';
import * as fromRoleActions from './role.action';
import * as fromPermissionActions from './permission.action';
import { AuthorizationState } from './auth.state';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private httpService: AuthHttpService, private store: Store<AuthorizationState>) {}

  doFetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doFetchRoles),
      map((action) => action.requestCriteria),
      switchMap((criteria) =>
        this.httpService.fetchRoles(criteria).pipe(
          map((results) => fromRoleActions.doFetchRolesSuccess({ roles: results })),
          catchError((error) => of(fromRoleActions.doFetchRolesFail(error)))
        )
      )
    )
  );

  doFetchUserRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doFetchUserRoles),
      map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
      switchMap((data) =>
        this.httpService.fetchUserRoles(data.id, data.criteria).pipe(
          map((results) => fromRoleActions.doFetchUserRolesSuccess({ roles: results })),
          catchError((error) => of(fromRoleActions.doFetchUserRolesFail(error)))
        )
      )
    )
  );

  doFetchRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doFetchRole),
      map((action) => Object.assign({}, { id: action.id, criteria: action.criteria })),
      switchMap((data) =>
        this.httpService.fetchRoleById(data.id, data.criteria).pipe(
          map((result) => fromRoleActions.doFetchRoleSuccess({ role: result.data })),
          catchError((error) => of(fromRoleActions.doFetchRoleFail(error)))
        )
      )
    )
  );

  doCreateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doCreateRole),
      map((action) => action.form),
      switchMap((form) =>
        this.httpService.createRole(form).pipe(
          map((result) => fromRoleActions.doCreateRoleSuccess({ role: result.data })),
          catchError((error) => of(fromRoleActions.doCreateRoleFail(error)))
        )
      )
    )
  );

  doDeleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doDeleteRole),
      map((action) => action.id),
      switchMap((id) =>
        this.httpService.deleteRoleById(id).pipe(
          map(() => fromRoleActions.doDeleteRoleSuccess()),
          catchError((error) => of(fromRoleActions.doDeleteRoleFail(error)))
        )
      )
    )
  );

  doAttachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doAttachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.httpService.attachPermission(permForm).pipe(
          map(() => fromPermissionActions.doAttachPermissionSuccess()),
          catchError((error) => of(fromPermissionActions.doAttachPermissionFail(error)))
        )
      )
    )
  );

  doAttachUserPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doAttachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.httpService.attachUserPermission(permForm).pipe(
          map(() => fromPermissionActions.doAttachPermissionSuccess()),
          catchError((error) => of(fromPermissionActions.doAttachPermissionFail(error)))
        )
      )
    )
  );

  doDetachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doDetachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.httpService.detachPermission(permForm).pipe(
          map(() => fromPermissionActions.doDetachPermissionSuccess()),
          catchError((error) => of(fromPermissionActions.doDetachPermissionFail(error)))
        )
      )
    )
  );

  doDetachUserPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doDetachPermission),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.httpService.detachUserPermission(permForm).pipe(
          map(() => fromPermissionActions.doDetachPermissionSuccess()),
          catchError((error) => of(fromPermissionActions.doDetachPermissionFail(error)))
        )
      )
    )
  );

  doSyncPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doSyncPermissions),
      map((action) => action.permForm),
      switchMap((permForm) =>
        this.httpService.syncPermissions(permForm).pipe(
          map(() => fromPermissionActions.doSyncPermissionsSuccess()),
          catchError((error) => of(fromPermissionActions.doSyncPermissionsFail(error)))
        )
      )
    )
  );

  doFetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchPermissions),
      map((action) => action.requestCriteria),
      switchMap((criteria) =>
        this.httpService.fetchPermissions(criteria).pipe(
          map((results) =>
            fromPermissionActions.doFetchPermissionsSuccess({
              permissions: results
            })
          ),
          catchError((error) => of(fromPermissionActions.doFetchPermissionsFail(error)))
        )
      )
    )
  );

  doFetchUserPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchUserPermissions),
      map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
      switchMap((data) =>
        this.httpService.fetchUserPermissions(data.id, data.criteria).pipe(
          map((results) =>
            fromPermissionActions.doFetchUserPermissionsSuccess({
              permissions: results
            })
          ),
          catchError((error) => of(fromPermissionActions.doFetchUserPermissionsFail(error)))
        )
      )
    )
  );

  doFetchRolePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchRolePermissions),
      map((action) => Object.assign({}, { id: action.id, criteria: action.requestCriteria })),
      switchMap((data) =>
        this.httpService.fetchRolePermissions(data.id, data.criteria).pipe(
          map((results) =>
            fromPermissionActions.doFetchRolePermissionsSuccess({
              permissions: results
            })
          ),
          catchError((error) => of(fromPermissionActions.doFetchRolePermissionsFail(error)))
        )
      )
    )
  );

  doFetchPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPermissionActions.doFetchPermission),
      map((action) => action.id),
      switchMap((id) =>
        this.httpService.fetchPermission(id).pipe(
          map((result) =>
            fromPermissionActions.doFetchPermissionSuccess({
              permission: result.data
            })
          ),
          catchError((error) => of(fromPermissionActions.doFetchPermissionFail(error)))
        )
      )
    )
  );

  doAssignRole = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doAssignRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.httpService.assignRole(roleForm).pipe(
          map(() => fromRoleActions.doAssignRoleSuccess()),
          catchError((error) => of(fromRoleActions.doAssignRoleFail(error)))
        )
      )
    )
  );

  doRevokeRole = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doRevokeRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.httpService.revokeRole(roleForm).pipe(
          map(() => fromRoleActions.doRevokeRoleSuccess()),
          catchError((error) => of(fromRoleActions.doRevokeRoleFail(error)))
        )
      )
    )
  );

  doSyncRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRoleActions.doSyncRole),
      map((action) => action.roleForm),
      switchMap((roleForm) =>
        this.httpService.syncRole(roleForm).pipe(
          map(() => fromRoleActions.doSyncRoleSuccess()),
          catchError((error) => of(fromRoleActions.doSyncRoleFail(error)))
        )
      )
    )
  );
}
