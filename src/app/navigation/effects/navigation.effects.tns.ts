import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, LoginSuccess, Logout } from '@auth/actions/auth.actions';

@Injectable()
export class NavigationEffects {
  // For the nativescript login and logout navigations,
  // You want to clear the navigation history so that the
  // The action bar 'back' navigation button does not show up

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/home'], { clearHistory: true }))
  );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.router.navigate(['/login'], { clearHistory: true }))
  );

  constructor(private actions$: Actions, private router: RouterExtensions) {}
}
