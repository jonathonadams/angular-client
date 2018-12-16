import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { take, filter, tap, map } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { LoadAuthenticatedUser } from '../actions/user.actions';
import { AuthService } from '~/app/auth';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private store: Store<any>,
    private auth: AuthService
  ) {}

  resolve(): Observable<any> {
    // The resolver function checks to see if the the user is defined,
    // If it is not defined then it will attempt to load the authenticated
    // user from the JWT stored in local storage.
    // This handles cased such as when the page is refreshed
    // and the user does not have to authenticate again.
    // It also filters out the scenario where the current user is
    // not the current authenticated user, i.e. logout and then log back in
    return this.userService.user$.pipe(
      tap(user => (!user ? this.store.dispatch(new LoadAuthenticatedUser()) : undefined)),
      filter(user => user !== undefined),
      filter(user => user.id === this.auth.getDecodedToken().sub),
      take(1)
    );
  }
}
