import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@app/core';
import { Todo } from '../todos.model';
import { AuthService } from '~/app/auth';

@Injectable()
export class TodosService {
  constructor(private api: ApiService, private auth: AuthService) {}

  public getAllTodos(): Observable<Todo[]> {
    return this.api.get<Todo[]>('todos');
  }

  public getOneTodo(id: string): Observable<Todo[]> {
    return this.api.get<Todo[]>(`todos/${id}`);
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
