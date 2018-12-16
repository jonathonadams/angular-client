import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectAllTodos,
  TodosEntityState,
  selectUserTodos,
  selectCurrentTodo
} from '../reducers/todos.reducer';
import {
  LoadTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  SelectTodo,
  ClearSelectedTodo
} from '../actions/todos.actions';
import { Todo } from '../models/todos.model';

@Injectable()
export class TodosFacade {
  public todo$: Observable<Todo[]>;
  public userTodo$: Observable<Todo[]>;
  public selectedTodo$: Observable<Todo>;

  constructor(private store: Store<TodosEntityState>) {
    this.todo$ = this.store.pipe(select(selectAllTodos));
    this.userTodo$ = this.store.pipe(select(selectUserTodos));
    this.selectedTodo$ = this.store.pipe(select(selectCurrentTodo));
  }

  loadTodos() {
    this.store.dispatch(new LoadTodos());
  }

  selectTodo(todo: Todo) {
    this.store.dispatch(new SelectTodo(todo.id));
  }

  clearSelected() {
    this.store.dispatch(new ClearSelectedTodo());
  }

  saveTodo(todo: Todo) {
    todo.id ? this.updateTodo(todo) : this.createTodo(todo);
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
