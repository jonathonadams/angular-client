import { Action } from '@ngrx/store';
import { ActionWithPayload } from '@store/reducers';
import { LoginCredentials, LoginResponse } from '../models/auth.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  LogoutRedirect = '[Auth] Logout Redirect'
}

export class Login implements ActionWithPayload<LoginCredentials> {
  readonly type = AuthActionTypes.Login;
  constructor(readonly payload: LoginCredentials) {}
}

export class LoginSuccess implements ActionWithPayload<LoginResponse> {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(readonly payload: { token: string }) {}
}

export class LoginFailure implements ActionWithPayload<Error> {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(readonly payload: Error) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion = Login | LoginSuccess | LoginFailure | Logout;
