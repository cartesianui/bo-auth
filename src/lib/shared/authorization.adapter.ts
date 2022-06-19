import { Injectable } from '@angular/core';
import { convertObjectKeysToCamel } from '@cartesianui/core';

@Injectable()
export class AuthorizationAdapter {
  constructor() {}

  /**
   * Camelize response keys
   *
   *  @param role Object to camelize keys of
   */
  static rolesAdapter(roles: any): any {
    return Object.assign({}, roles, convertObjectKeysToCamel(roles));
  }
}
