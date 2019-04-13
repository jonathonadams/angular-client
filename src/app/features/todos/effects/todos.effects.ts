import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoadTodos,
  TodoActionTypes,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  LoadTodosSuccess,
  CreateTodoSuccess,
  LoadTodosFail,
  CreateTodoFail,
  UpdateTodoSuccess,
  DeleteTodoSuccess,
  DeleteTodoFail,
  UpdateTodoFail
} from '../actions/todos.actions';
import { TodosService } from '../services/todos.service';
import { AppState } from '@app/store/reducers';
import { HttpErrorAction } from '@app/store/effects/error-effects';

// Note: when merging observable from multiple sources there are 4x operators tha can be uses
// exhaustMap, mergeMap, switchMap and concatMap

// exhaustMap -> ignores subsequent request until the current one has completed
// use when you want the current one to complete. e.g. login or loading initial resources. Ignore everything else until it completes.

// mergeMap -> all effects happen concurrently. Nothing is aborted and all observables complete (or error)
// This is good for action where the order of completion does not matter as they may complete out of time.. i.e. deleting or adding an item.

// switchMap -> switches to the current observable as it. Note that it sends the unsubscribe (and subsequent cancel) to the current observable.
// This is generally not desired for API calls as the current request will be cancelled. i.e. if you spam the delete button the next click will
// cancel the current delete API call. This is undesired.

// concatMap -> merges the observable in the correct order. No observable is ignored and everything runs sequentially. Use this when order matters.

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodosService,
    private store: Store<AppState>
  ) {}

  @Effect()
  loadTodos$ = this.actions$.pipe(
    ofType<LoadTodos>(TodoActionTypes.Load),
    exhaustMap(action =>
      this.todoService.getAllTodos().pipe(
        map(queryResult => queryResult.data.allTodos),
        map(todos => new LoadTodosSuccess(todos)),
        catchError(error => of(new LoadTodosFail(error)))
      )
    )
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType<CreateTodo>(TodoActionTypes.Create),
    map(action => action.payload),
    mergeMap(newTodo =>
      this.todoService.createTodo(newTodo).pipe(
        map(queryResult => queryResult.data.newTodo),
        map(todo => new CreateTodoSuccess(todo)),
        catchError(error => of(new CreateTodoFail(error)))
      )
    )
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType<UpdateTodo>(TodoActionTypes.Update),
    map(action => action.payload),
    mergeMap(updateTodo =>
      this.todoService.updateTodo(updateTodo).pipe(
        map(queryResult => queryResult.data.updateTodo),
        map(todo => new UpdateTodoSuccess(todo)),
        catchError(error => of(new UpdateTodoFail(error)))
      )
    )
  );

  @Effect()
  deleteTodo$ = this.actions$.pipe(
    ofType<DeleteTodo>(TodoActionTypes.Delete),
    map(action => action.payload),
    mergeMap(todo =>
      this.todoService.deleteTodo(todo.id).pipe(
        map(queryResult => queryResult.data.removeTodo),
        map(deletedTodo => new DeleteTodoSuccess(deletedTodo)),
        catchError(error => of(new DeleteTodoFail(error)))
      )
    )
  );

  @Effect()
  todoSaveError$ = this.actions$.pipe(
    ofType<CreateTodoFail | UpdateTodoFail | DeleteTodoFail | LoadTodosFail>(
      TodoActionTypes.CreateFail,
      TodoActionTypes.UpdateFail,
      TodoActionTypes.DeleteFail,
      TodoActionTypes.LoadFail
    ),
    map(action => new HttpErrorAction(action.payload))
  );
}
