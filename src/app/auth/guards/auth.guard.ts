import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@auth/services/auth.service';
import { Logout } from '@auth/actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private store: Store<any>) {}

  canActivate() {
    if (this.auth.checkUserIsLoggedIn()) {
      return true;
    } else {
      this.store.dispatch(new Logout());
      return false;
    }
  }
}
