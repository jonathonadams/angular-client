import { ActionWithPayload } from '@store/reducers';
import { User } from '../models/user.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadSuccess = '[User] Load Success',
  LoadFail = '[User] Load Fail',
  Create = '[User] Create',
  CreateSuccess = '[User] Create Success',
  CreateFail = '[User] Create Fail',
  Update = '[User] Update',
  UpdateSuccess = '[User] Update Success',
  UpdateFail = '[User] Update Fail',
  Delete = '[User] Delete',
  DeleteSuccess = '[User] Delete Success',
  DeleteFail = '[User] Delete Fail',
  Select = '[User] Select',
  ClearSelected = '[User] Clear Selected',
  LoadAuthenticated = '[Authenticated User] Load',
  LoadAuthenticatedSuccess = '[Authenticated User] Load Success',
  LoadAuthenticatedFail = '[Authenticated User] Load Fail',
  SelectAuthenticated = '[Authenticated User] Select',
  ClearAuthenticated = '[Authenticated User] Clear Selected'
}

export class SelectUser implements ActionWithPayload<string> {
  readonly type = UserActionTypes.Select;
  constructor(public payload: string) {}
}

export class ClearSelectedUser implements Action {
  readonly type = UserActionTypes.ClearSelected;
}

export class SelectAuthenticatedUser implements ActionWithPayload<string> {
  readonly type = UserActionTypes.SelectAuthenticated;
  constructor(public payload: string) {}
}

export class ClearAuthenticatedUser implements Action {
  readonly type = UserActionTypes.ClearAuthenticated;
}

// Load AuthenticatedUser
export class LoadAuthenticatedUser implements Action {
  readonly type = UserActionTypes.LoadAuthenticated;
}

export class LoadAuthenticatedUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.LoadAuthenticatedSuccess;
  constructor(public payload: User) {}
}

export class LoadAuthenticatedUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.LoadAuthenticatedFail;
  constructor(public payload: User) {}
}

/**
 * Load user actions
 */

export class LoadUsers implements Action {
  readonly type = UserActionTypes.Load;
}

export class LoadUsersSuccess implements ActionWithPayload<User[]> {
  readonly type = UserActionTypes.LoadSuccess;
  constructor(readonly payload: User[]) {}
}

export class LoadUserFail implements ActionWithPayload<Error> {
  readonly type = UserActionTypes.LoadFail;
  constructor(readonly payload: Error) {}
}

/**
 * Create User actions
 */

export class CreateUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Create;
  constructor(public payload: User) {}
}

export class CreateUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.CreateSuccess;
  constructor(public payload: User) {}
}

export class CreateUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.CreateFail;
  constructor(public payload: User) {}
}

/**
 * Update User actions
 */

export class UpdateUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Update;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.UpdateSuccess;
  constructor(public payload: User) {}
}

export class UpdateUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.UpdateFail;
  constructor(public payload: User) {}
}

/**
 * Delete User actions
 */

export class DeleteUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Delete;
  constructor(public payload: User) {}
}

export class DeleteUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.DeleteSuccess;
  constructor(public payload: User) {}
}

export class DeleteUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.DeleteFail;
  constructor(public payload: User) {}
}

export type UserActionUnion =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUserFail
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail
  | LoadAuthenticatedUser
  | LoadAuthenticatedUserSuccess
  | LoadAuthenticatedUserFail
  | SelectAuthenticatedUser
  | ClearAuthenticatedUser;
