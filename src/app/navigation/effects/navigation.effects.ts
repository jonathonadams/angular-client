import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, LoginSuccess, Logout } from '@auth/actions/auth.actions';

@Injectable()
export class NavigationEffects {
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/home']))
  );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.router.navigate(['/login']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
