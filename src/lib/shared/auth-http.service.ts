import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Criteria, DefaultHeaders, DELETE, GET, HttpService, Path, POST, RequestCriteria, Adapter } from '@cartesianui/core';
import { SearchRoleForm } from '../models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class AuthHttpService extends HttpService {
  /**
   * Submits assign role form to the server
   * @param form The form to be submitted as body
   */
  @POST('/roles/assign')
  public assignRole(@Body form): Observable<any> {
    return null;
  }

  /**
   * Submits revoke role form to the server
   * @param form The form to be submitted as body
   */
  @POST('/roles/revoke')
  public revokeRole(@Body form): Observable<any> {
    return null;
  }

  @POST('/roles/sync')
  public syncRole(@Body form): Observable<any> {
    return null;
  }

  @GET('/roles')
  public fetchRoles(@Criteria criteria: RequestCriteria<any>): Observable<any> {
    return null;
  }

  @GET('/roles/{id}')
  public fetchRoleById(@Path('id') id: string, @Criteria criteria: RequestCriteria<SearchRoleForm>): Observable<any> {
    return null;
  }

  @POST('/roles')
  public createRole(@Body form): Observable<any> {
    return null;
  }

  @DELETE('/roles/{id}')
  public deleteRoleById(@Path('id') id: string): Observable<any> {
    return null;
  }

  @GET('/permissions')
  public fetchPermissions(@Criteria criteria: RequestCriteria<any>): Observable<any> {
    return null;
  }

  @GET('/permissions/{id}')
  public fetchPermission(@Path('id') id: string): Observable<any> {
    return null;
  }

  @POST('/permissions/attach')
  public attachPermission(@Body form): Observable<any> {
    return null;
  }

  @POST('/permissions/detach')
  public detachPermission(@Body form): Observable<any> {
    return null;
  }

  @POST('/permissions/sync')
  public syncPermissions(@Body form): Observable<any> {
    return null;
  }
}
