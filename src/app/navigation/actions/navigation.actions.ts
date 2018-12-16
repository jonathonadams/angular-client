import { Action } from '@ngrx/store';

export enum NavigationActionTypes {
  LoginRedirect = '[Navigation] Login Redirect',
  LogoutRedirect = '[Navigation] Logout Redirect'
}

export class LoginRedirect implements Action {
  readonly type = NavigationActionTypes.LoginRedirect;
}

export class LogoutRedirect implements Action {
  readonly type = NavigationActionTypes.LogoutRedirect;
}

export type NavigationAtionUnion = LoginRedirect | LogoutRedirect;
