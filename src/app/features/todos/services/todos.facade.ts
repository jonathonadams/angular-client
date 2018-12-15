import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllTodos, TodosEntityState, selectUserTodos } from '../reducers/todos.reducer';
import { LoadTodos, CreateTodo, UpdateTodo, DeleteTodo } from '../actions/todos.actions';
import { Todo } from '../todos.model';

@Injectable()
export class TodosFacade {
  public todo$: Observable<Todo[]>;
  public userTodo$: Observable<Todo[]>;

  constructor(private store: Store<TodosEntityState>) {
    this.todo$ = this.store.pipe(select(selectAllTodos));
    this.userTodo$ = store.pipe(select(selectUserTodos));
  }

  loadTodos() {
    this.store.dispatch(new LoadTodos());
  }

  selectTodo(todo: Todo) {
    // this.store.dispatch(new SelectTodo(todo.id));
  }

  createTodo(todo: Todo) {
    this.store.dispatch(new CreateTodo(todo));
  }

  updateTodo(todo: Todo) {
    this.store.dispatch(new UpdateTodo(todo));
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo));
  }
}
