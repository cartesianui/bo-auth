import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ICartesianResponse } from '@cartesianui/core';
import { map, switchMap } from 'rxjs/operators';
import { AuthHttpService } from '../shared/auth-http.service';
import { RoleActions } from './role/role.actions';
import { PermissionActions } from './permission/permission.actions';
import { Role } from '../models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private httpService: AuthHttpService
  ) {}

  fetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.fetchRoles),
      map(({ criteria }) => criteria),
      switchMap((criteria) => this.httpService.fetchRoles(criteria).pipe(map(({ data, meta }: ICartesianResponse) => RoleActions.loadRoles({ roles: data, meta: meta }))))
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.createRole),
      map(({ role }) => role),
      switchMap((role) =>
        this.httpService.createRole(role).pipe(
          map(({ data }: ICartesianResponse) => RoleActions.createSuccess({ role: data })),
          catchError(({ errors, message }: ICartesianResponse) => of(RoleActions.createFailure({ errors, message })))
        )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.updateRole),
      map(({ role }) => role),
      switchMap(({ id, changes }: Update<Role>) =>
        this.httpService.updateRole(id as string, changes).pipe(
          map(({ data }: ICartesianResponse) => RoleActions.updateSuccess({ role: data })),
          catchError(({ errors, message }: ICartesianResponse) => of(RoleActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.deleteRole),
      map(({ id }) => id),
      switchMap((id) => this.httpService.deleteRole(id))
    )
  );

  fetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PermissionActions.fetchPermissions),
      map((action) => action.criteria),
      switchMap((criteria) => this.httpService.fetchPermissions(criteria).pipe(map(({ data, meta }: ICartesianResponse) => PermissionActions.loadPermissions({ permissions: data, meta: meta }))))
    )
  );

  syncPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.syncPermissions),
      map(({ form }) => form),
      switchMap((form) =>
        this.httpService.syncPermissions(form).pipe(
          switchMap(({ data }: ICartesianResponse) => of(RoleActions.updateRole({ role: data }), RoleActions.updateSuccess({ role: data }))),
          catchError(({ errors, message }: ICartesianResponse) => of(RoleActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  attachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.attachPermissions),
      map(({ form }) => form),
      switchMap((form) =>
        this.httpService.attachPermission(form).pipe(
          switchMap(({ data }: ICartesianResponse) => of(RoleActions.updateRole({ role: data }), RoleActions.updateSuccess({ role: data }))),
          catchError(({ errors, message }: ICartesianResponse) => of(RoleActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  detachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.detachPermissions),
      map(({ form }) => form),
      switchMap((form) =>
        this.httpService.detachPermission(form).pipe(
          switchMap(({ data }: ICartesianResponse) => of(RoleActions.updateRole({ role: data }), RoleActions.updateSuccess({ role: data }))),
          catchError(({ errors, message }: ICartesianResponse) => of(RoleActions.updateFailure({ errors, message })))
        )
      )
    )
  );
}
