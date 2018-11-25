import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  UserActionTypes,
  LoadUserSuccess,
  LoadUserFail,
  LoadAuthenticatedUser
} from './user.actions';
import { UserService } from './user.service';
import { AuthService } from '~/app/auth';

@Injectable()
export class UserEffects {
  @Effect()
  loadAuthenticatedUser$ = this.actions$.pipe(
    ofType<LoadAuthenticatedUser>(UserActionTypes.LoadAuthenticated),
    map(action => this.authService.getDecodedToken().sub),
    switchMap(id =>
      this.userService.loadUser(id).pipe(
        map(user => new LoadUserSuccess(user)),
        catchError(error => of(new LoadUserFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService
  ) {}
}
