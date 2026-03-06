import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Criteria, DefaultHeaders, DELETE, GET, HttpService, Path, POST, RequestCriteriaOuput, PUT } from '@cartesianui/core';
import { Role } from '../models';
import { AuthorizationAdapter } from './authorization.adapter';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class AuthHttpService extends HttpService {

  // Authorization: User Routes
  @GET('/users/{id}/roles')
  public getUserRoles(@Path('id') id: string, @Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @POST('/users/{id}/roles')
  public assignRole(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @PUT('/users/{id}/roles')
  public syncRole(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}/roles')
  public revokeRole(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @GET('/users/{id}/permissions')
  public getUserPermissions(@Path('id') id: string, @Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @POST('/users/{id}/permissions')
  public attachUserPermission(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}/permissions')
  public detachUserPermission(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  // Authorization: Role Routes
  @GET('/roles')
  public getRoles(@Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @GET('/roles/{id}')
  public getRole(@Path('id') id: string, @Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @POST('/roles')
  public createRole(@Body form: Role): Observable<any> {
    return null;
  }

  @PUT('/roles/{id}')
  public updateRole(@Path('id') id: string, @Body Role): Observable<any> {
    return null;
  }

  @DELETE('/roles/{id}')
  public deleteRole(@Path('id') id: string): Observable<any> {
    return null;
  }

  @GET('/roles/{id}/permissions')
  public getRolePermissions(@Path('id') id: string, @Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @POST('/roles/{id}/permissions')
  public attachPermission(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @PUT('/roles/{id}/permissions')
  public syncPermissions(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }

  @DELETE('/roles/{id}/permissions')
  public detachPermission(@Path('id') id: string, @Body form): Observable<any> {
    return null;
  }
  

  @GET('/permissions')
  public getPermissions(@Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @GET('/permissions/{id}')
  public getPermission(@Path('id') id: string): Observable<any> {
    return null;
  }
}
