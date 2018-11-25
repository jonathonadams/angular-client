import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { LoadAuthenticatedUser } from './user.actions';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private store: Store<any>) {}

  resolve(): Observable<any> {
    // The resolver function checks to see if the the user is defined,
    // If it is not defined then it will attempt to load the authenticated
    // user from the JWT stored in local storage.
    // This handles cased such as when the page is refreshed
    // and the user does not have to authenticate again.
    return this.userService.user$.pipe(
      tap(user => (!user ? this.store.dispatch(new LoadAuthenticatedUser()) : undefined)),
      filter(val => val !== undefined),
      take(1)
    );
  }
}
