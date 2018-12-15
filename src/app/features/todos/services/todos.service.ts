import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApiService } from '@app/core';
import { Todo } from '../todos.model';
import { AppState } from '@app/store/reducers';
import { selectTodos, selectUserTodos } from '../reducers/todos.reducer';
import { UpdateTodo, CreateTodo } from '../actions/todos.actions';
import { AuthService } from '~/app/auth';

@Injectable()
export class TodoService {
  public todo$: Observable<Todo[]>;
  public userTodo$: Observable<Todo[]>;

  constructor(private store: Store<AppState>, private api: ApiService, private auth: AuthService) {
    this.todo$ = this.store.pipe(select(selectTodos));
    this.userTodo$ = this.store.pipe(select(selectUserTodos));
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
    // Set the user id of the current JWT id
    todo.userId = this.auth.getDecodedToken().sub;
    return this.api.post<Todo>('todos', todo);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.api.put<Todo>('todos', todo);
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.api.delete<Todo>('todos', todo);
  }
}
