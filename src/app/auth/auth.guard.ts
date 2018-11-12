import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { Logout } from './auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private store: Store<AppState>) {}

  canActivate() {
    console.log('inside log guard');
    console.log(this.auth.checkUserIsLoggedIn());
    if (this.auth.checkUserIsLoggedIn()) {
      return true;
    } else {
      this.store.dispatch(new Logout());
      return false;
    }
  }
}
