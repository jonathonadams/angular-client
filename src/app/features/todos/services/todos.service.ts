import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, GraphQLService } from '@app/core';
import { Todo } from '../models/todos.model';
import { AuthService } from '~/app/auth';
import { Router } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';

@Injectable()
export class TodosService {
  readonly allTodoProperties = `
  fragment allTodoProperties on Todo {
    id
    userId
    title
    description
    completed
  }
  
  `;

  constructor(
    private graphQl: GraphQLService,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  public getAllTodos(): Observable<ApolloQueryResult<{ allTodos: Todo[] }>> {
    const query = `
      {
        allTodos {
          ...allTodoProperties
        }
      }
      ${this.allTodoProperties}
    `;
    return this.graphQl.query<{ allTodos: Todo[] }>(query);
  }

  public getOneTodo(id: string): Observable<ApolloQueryResult<{ Todo: Todo }>> {
    const query = `
      query LoadTodo($id: ID!) {
        Todo(id: $id) {
          ...allTodoProperties
        }
      }
      ${this.allTodoProperties}
    `;
    return this.graphQl.query<{ Todo: Todo }>(query, { id });
  }

  // public getAllTodos(): Observable<Todo[]> {
  //   return this.api.get<Todo[]>(`todos`);
  // }

  // public getOneTodo(id: string): Observable<Todo> {
  //   return this.api.get<Todo>(`todos/${id}`);
  // }

  public createTodo(todo: Todo): Observable<Todo> {
    // Set the user id of the current JWT id
    todo.userId = this.auth.getDecodedToken().sub;
    return this.api.post<Todo>('todos', todo);
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.api.put<Todo>('todos', todo);
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.api.delete<Todo>('todos', todo.id);
  }

  public navigateTo(id: string = ''): void {
    this.router.navigate([`/todos/${id}`]);
  }
}
