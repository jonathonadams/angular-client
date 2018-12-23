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
import { Router } from '@angular/router';

@Injectable()
export class TodosFacade {
  public todo$: Observable<Todo[]>;
  public userTodo$: Observable<Todo[]>;
  public selectedTodo$: Observable<Todo>;

  constructor(private store: Store<TodosEntityState>, private router: Router) {
    this.todo$ = this.store.pipe(select(selectAllTodos));
    this.userTodo$ = this.store.pipe(select(selectUserTodos));
    this.selectedTodo$ = this.store.pipe(select(selectCurrentTodo));
  }

  public loadTodos(): void {
    this.store.dispatch(new LoadTodos());
  }

  public selectTodo(id: string): void {
    this.store.dispatch(new SelectTodo(id));
  }

  public clearSelected(): void {
    this.store.dispatch(new ClearSelectedTodo());
  }

  public saveTodo(todo: Todo): void {
    todo.id ? this.updateTodo(todo) : this.createTodo(todo);
  }

  public createTodo(todo: Todo): void {
    this.store.dispatch(new CreateTodo(todo));
  }

  public updateTodo(todo: Todo): void {
    this.store.dispatch(new UpdateTodo(todo));
  }

  public deleteTodo(id: string): void {
    this.store.dispatch(new DeleteTodo(id));
  }
}
