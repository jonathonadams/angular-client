import { ActionWithPayload } from '@app/store/reducers';
import { Todo } from '@app/features/todos/todos.model';
import { Action } from '@ngrx/store';

export enum TodoActionTypes {
  Load = '[Todo] Load',
  LoadSuccess = '[Todo] Load Success',
  LoadFail = '[Todo] Load Fail',
  Create = '[Todo] Create',
  CreateSuccess = '[Todo] Create Success',
  CreateFail = '[Todo] Create Fail',
  Update = '[Todo] Update',
  UpdateSuccess = '[Todo] Update Success',
  UpdateFail = '[Todo] Update Fail',
  Delete = '[Todo] Delete',
  DeleteSuccess = '[Todo] Delete Success',
  DeleteFail = '[Todo] Delete Fail'
}

/**
 * Load Todo action
 */
export class LoadTodos implements Action {
  readonly type = TodoActionTypes.Load;
}

export class LoadTodosSuccess implements ActionWithPayload<Todo[]> {
  readonly type = TodoActionTypes.LoadSuccess;
  constructor(public payload: Todo[]) {}
}

export class LoadTodosFail implements ActionWithPayload<Error> {
  readonly type = TodoActionTypes.LoadFail;
  constructor(public payload: Error) {}
}

/**
 * Create Todo actions
 */

export class CreateTodo implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.Create;
  constructor(public payload: Todo) {}
}

export class CreateTodoSuccess implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.CreateSuccess;
  constructor(public payload: Todo) {}
}

export class CreateTodoFail implements ActionWithPayload<Error> {
  readonly type = TodoActionTypes.CreateFail;
  constructor(public payload: Error) {}
}

/**
 * Update Todo actions
 */

export class UpdateTodo implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.Update;
  constructor(public payload: Todo) {}
}

export class UpdateTodoSuccess implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.UpdateSuccess;
  constructor(public payload: Todo) {}
}

export class UpdateTodoFail implements ActionWithPayload<Error> {
  readonly type = TodoActionTypes.UpdateFail;
  constructor(public payload: Error) {}
}

/**
 * Delete Todo actions
 */

export class DeleteTodo implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.Delete;
  constructor(public payload: Todo) {}
}

export class DeleteTodoSuccess implements ActionWithPayload<Todo> {
  readonly type = TodoActionTypes.DeleteSuccess;
  constructor(public payload: Todo) {}
}

export class DeleteTodoFail implements ActionWithPayload<Error> {
  readonly type = TodoActionTypes.DeleteFail;
  constructor(public payload: Error) {}
}

export type TodoActionUnion =
  | LoadTodos
  | LoadTodosSuccess
  | LoadTodosFail
  | CreateTodo
  | CreateTodoSuccess
  | CreateTodoFail
  | UpdateTodo
  | UpdateTodoSuccess
  | UpdateTodoFail
  | DeleteTodo
  | DeleteTodoSuccess
  | DeleteTodoFail;