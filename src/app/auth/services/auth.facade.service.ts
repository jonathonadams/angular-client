import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginCredentials } from '../models/auth.model';
import { Login, Logout } from '../actions/auth.actions';
import { LoadAuthenticatedUser, User } from '~/app/features/users';
import { Observable } from 'rxjs';
import { selectAuthenticatedUser } from '~/app/features/users/reducers/user.reducer';

@Injectable()
export class AuthFacade {
  public authenticatedUser$: Observable<User>;
  constructor(private store: Store<any>) {
    this.authenticatedUser$ = this.store.pipe(select(selectAuthenticatedUser));
  }

  login(credentials: LoginCredentials) {
    this.store.dispatch(new Login(credentials));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  loadAuthenticatedUser() {
    this.store.dispatch(new LoadAuthenticatedUser());
  }
}
