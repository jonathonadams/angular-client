import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApiService } from '@app/core';
import { Todo } from './todos.model';
import { AppState } from '@app/store/reducers';
import { selectTodos } from './todos.reducer';
import { UpdateTodo, CreateTodo } from '@app/features/todos/todos.actions';

@Injectable()
export class TodoService {
  public todo$: Observable<Todo[]>;

  constructor(private store: Store<AppState>, private api: ApiService) {
    this.todo$ = this.store.pipe(select(selectTodos));
  }

  public loadTodos(): Observable<Todo[]> {
    return this.api.get<Todo[]>('todos');
  }

  public getTodo(id: string): Observable<Todo[]> {
    return this.api.get<Todo[]>(`todos/${id}`);
  }

  public saveTodo(todo: any): void {
    const action = todo.id ? new UpdateTodo(todo) : new CreateTodo(todo);
    this.store.dispatch(action);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.api.post<Todo>('todos', todo);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.api.put<Todo>('todos', todo);
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.api.delete<Todo>('todos', todo);
  }
}
