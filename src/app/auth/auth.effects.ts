import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LoginRedirect
} from './auth.actions';
import { AuthService } from './auth.service';
import { LoginCredentials } from './auth.model';
import { LoadUserSuccess } from '../features/users';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: LoginCredentials) =>
      this.authService.login(auth).pipe(
        // map(result => result.data.login), // use this for graphql
        map(loginResponse => new LoginSuccess(loginResponse)),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(action => this.authService.removeAuthorizationToken()),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(action => this.authService.setAuthorizationToken(action.payload.token)),
    tap(() => this.router.navigate(['/home'])),
    map(action => new LoadUserSuccess(action.payload.user))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginRedirect>(AuthActionTypes.LoginRedirect),
    tap(authed => this.router.navigate(['/home']))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
