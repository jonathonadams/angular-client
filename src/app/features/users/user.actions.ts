import { ActionWithPayload } from '@store/reducers';
import { User } from './user.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadAuthenticated = '[User] Load Authenticated',
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
  DeleteFail = '[User] Delete Fail'
}

/**
 * Load user actions
 */

export class LoadUsers implements Action {
  readonly type = UserActionTypes.Load;
}

export class LoadAuthenticatedUser implements Action {
  readonly type = UserActionTypes.LoadAuthenticated;
}

export class LoadUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.LoadSuccess;
  constructor(readonly payload: User) {}
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

export class DeleteUser implements Action {
  readonly type = UserActionTypes.Delete;
}

export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteSuccess;
}

export class DeleteUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.DeleteFail;
  constructor(public payload: User) {}
}

export type UserActionUnion =
  | LoadUsers
  | LoadAuthenticatedUser
  | LoadUserSuccess
  | LoadUserFail
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail;
