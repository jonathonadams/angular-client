import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import {
  LoginRedirect,
  NavigationActionTypes,
  LogoutRedirect
} from '../actions/navigation.actions';

@Injectable()
export class NavigationEffects {
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginRedirect>(NavigationActionTypes.LoginRedirect),
    tap(() => this.router.navigate(['/home']))
  );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$.pipe(
    ofType<LogoutRedirect>(NavigationActionTypes.LogoutRedirect),
    tap(() => this.router.navigate(['/login']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
