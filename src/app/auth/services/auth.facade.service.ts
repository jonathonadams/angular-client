import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoginCredentials } from '../models/auth.model';
import { Login, LoginRedirect } from '../actions/auth.actions';
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

  loginRedirect() {
    this.store.dispatch(new LoginRedirect());
  }

  loadAuthenticatedUser() {
    this.store.dispatch(new LoadAuthenticatedUser());
  }
}
