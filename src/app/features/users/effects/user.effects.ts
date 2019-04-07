import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap, tap } from 'rxjs/operators';
import {
  UserActionTypes,
  LoadAuthenticatedUser,
  LoadAuthenticatedUserSuccess,
  LoadAuthenticatedUserFail,
  SelectAuthenticatedUser,
  ClearAuthenticatedUser,
  UpdateUser,
  UpdateUserSuccess,
  UpdateUserFail
} from '../actions/user.actions';
import { UserService } from '../services/user.service';
import { AuthService, Logout, AuthActionTypes } from '~/app/auth';

@Injectable()
export class UserEffects {
  @Effect()
  loadAuthenticatedUser$ = this.actions$.pipe(
    ofType<LoadAuthenticatedUser>(UserActionTypes.LoadAuthenticated),
    map(action => this.authService.getDecodedToken().sub),
    switchMap(id =>
      this.userService.getOneUser(id).pipe(
        tap(user => this.userService.setUserThemeColors(user)),
        map(user => new LoadAuthenticatedUserSuccess(user)),
        catchError(error => of(new LoadAuthenticatedUserFail(error)))
      )
    )
  );

  @Effect()
  selectAuthenticatedUser$ = this.actions$.pipe(
    ofType<LoadAuthenticatedUserSuccess>(UserActionTypes.LoadAuthenticatedSuccess),
    map(action => action.payload.id),
    map(id => new SelectAuthenticatedUser(id))
  );

  @Effect()
  clearAuthenticatedUser$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    map(id => new ClearAuthenticatedUser())
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<UpdateUser>(UserActionTypes.Update),
    mergeMap(action =>
      this.userService.updateUser(action.payload).pipe(
        map(updatedUser => new UpdateUserSuccess(updatedUser)),
        catchError(error => of(new UpdateUserFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService
  ) {}
}
