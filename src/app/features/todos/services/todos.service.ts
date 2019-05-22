import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphQLService } from '@app/core';
import { Todo } from '../models/todos.model';
import { AuthService } from '~/app/auth';
import { Router } from '@angular/router';
import { ApolloQueryResult } from 'apollo-client';
import {
  ALL_TODOS_QUERY,
  LOAD_TODO_QUERY,
  CREATE_TODO_QUERY,
  UPDATE_TODO_QUERY,
  REMOTE_TODO_QUERY
} from './todos.queries';

@Injectable()
export class TodosService {
  constructor(private graphQl: GraphQLService, private auth: AuthService, private router: Router) {}

  public getAllTodos(): Observable<ApolloQueryResult<{ allTodos: Todo[] }>> {
    return this.graphQl.query<{ allTodos: Todo[] }>(ALL_TODOS_QUERY);
  }

  public getOneTodo(id: string): Observable<ApolloQueryResult<{ Todo: Todo }>> {
    return this.graphQl.query<{ Todo: Todo }>(LOAD_TODO_QUERY, { id });
  }

  public createTodo(todo: Todo): Observable<ApolloQueryResult<{ newTodo: Todo }>> {
    // Set the user id of the current JWT id
    todo.user = this.auth.getDecodedToken().sub;
    // set the completed state to false
    todo.completed = false;
    const variables = { input: todo };

    return this.graphQl.mutation<{ newTodo: Todo }>(CREATE_TODO_QUERY, variables);
  }

  public updateTodo(todo: Todo): Observable<ApolloQueryResult<{ updateTodo: Todo }>> {
    const variables = { input: todo };

    return this.graphQl.mutation<{ updateTodo: Todo }>(UPDATE_TODO_QUERY, variables);
  }

  public deleteTodo(id: string): Observable<ApolloQueryResult<{ removeTodo: { id: string } }>> {
    const variables = { id };

    return this.graphQl.mutation<{ removeTodo: { id: string } }>(REMOTE_TODO_QUERY, variables);
  }

  // ------------------------------------------
  // The below functions can be used if you would
  // like to use REST based API calls
  // ------------------------------------------

  // public getAllTodos(): Observable<Todo[]> {
  //   return this.api.get<Todo[]>(`todos`);
  // }

  // public getOneTodo(id: string): Observable<Todo> {
  //   return this.api.get<Todo>(`todos/${id}`);
  // }

  // public createTodo(todo: Todo): Observable<Todo> {
  //   // Set the user id of the current JWT id
  //   todo.user = this.auth.getDecodedToken().sub;
  //   return this.api.post<Todo>('todos', todo);
  // }

  // public updateTodo(todo: Todo): Observable<Todo> {
  //   return this.api.put<Todo>('todos', todo);
  // }

  // public deleteTodo(todo: Todo): Observable<Todo> {
  //   return this.api.delete<Todo>('todos', todo.id);
  // }

  public navigateTo(id: string = ''): void {
    this.router.navigate([`/todos/${id}`]);
  }
}
