import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  TodosEntityState,
  selectCurrentTodo,
  selectFilteredTodos,
  selectTodoFilterSelection
} from '../reducers/todos.reducer';
import {
  LoadTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  SelectTodo,
  ClearSelectedTodo,
  TodoSelectFilter,
  TodoSearchFilter
} from '../actions/todos.actions';
import { Todo, TodoFilterStatus } from '../models/todos.model';
import { Router } from '@angular/router';

@Injectable()
export class TodosFacade {
  public todo$: Observable<Todo[]>;
  public userTodo$: Observable<Todo[]>;
  public selectedTodo$: Observable<Todo>;
  public allTodoFilter$: Observable<TodoFilterStatus>;

  constructor(private store: Store<TodosEntityState>, private router: Router) {
    // this.todo$ = this.store.pipe(select(selectAllTodos));
    this.userTodo$ = this.store.pipe(select(selectFilteredTodos));
    this.selectedTodo$ = this.store.pipe(select(selectCurrentTodo));
    this.allTodoFilter$ = this.store.pipe(select(selectTodoFilterSelection));
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

  public selectFilterChanged(selectionChange: TodoFilterStatus) {
    this.store.dispatch(new TodoSelectFilter(selectionChange));
  }

  public searchFilterChanged(searchString: string) {
    this.store.dispatch(new TodoSearchFilter(searchString));
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

  public deleteTodo(todo: Todo): void {
    this.store.dispatch(new DeleteTodo(todo));
  }
}
