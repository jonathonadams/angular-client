import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { User } from '../models/user.model';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private facade: AuthFacade // private auth: AuthService
  ) {}

  resolve(): Observable<any> {
    // The resolver function checks to see if the the user is defined,
    // If it is not defined then it will attempt to load the authenticated
    // user from the JWT stored in local storage.
    // This handles cased such as when the page is refreshed
    // and the user does not have to authenticate again.
    // It also filters out the scenario where the current user is
    // not the current authenticated user, i.e. logout and then log back in
    return this.facade.authenticatedUser$.pipe(
      tap(user => (!user ? this.facade.loadAuthenticatedUser() : undefined)),
      filter(user => user !== undefined),
      take(1)
    );
  }
}
