import { ActionWithPayload } from '@app/store/reducers';
import { Todo, TodoFilterStatus } from '~/app/features/todos/models/todos.model';
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
  DeleteFail = '[Todo] Delete Fail',
  Select = '[Todo] Select',
  ClearSelected = '[Todo] Clear Selected',
  SelectFilter = '[Todo] Select Filter',
  SearchFilter = '[Todo] Search Filter'
}

export class SelectTodo implements ActionWithPayload<string> {
  readonly type = TodoActionTypes.Select;
  constructor(public payload: string) {}
}

export class ClearSelectedTodo implements Action {
  readonly type = TodoActionTypes.ClearSelected;
}

export class TodoSelectFilter implements ActionWithPayload<TodoFilterStatus> {
  readonly type = TodoActionTypes.SelectFilter;
  constructor(public payload: TodoFilterStatus) {}
}

export class TodoSearchFilter implements ActionWithPayload<string> {
  readonly type = TodoActionTypes.SearchFilter;
  constructor(public payload: string) {}
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

export class DeleteTodoSuccess implements ActionWithPayload<{ id: string }> {
  readonly type = TodoActionTypes.DeleteSuccess;
  constructor(public payload: { id: string }) {}
}

export class DeleteTodoFail implements ActionWithPayload<Error> {
  readonly type = TodoActionTypes.DeleteFail;
  constructor(public payload: Error) {}
}

export type TodoActionUnion =
  | SelectTodo
  | ClearSelectedTodo
  | TodoSelectFilter
  | TodoSearchFilter
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
