import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginRedirect, LogoutRedirect } from '../actions/navigation.actions';

@Injectable()
export class NavigationFacade {
  constructor(private store: Store<any>) {}

  loginRedirect() {
    this.store.dispatch(new LoginRedirect());
  }

  logoutRedirect() {
    this.store.dispatch(new LogoutRedirect());
  }
}
