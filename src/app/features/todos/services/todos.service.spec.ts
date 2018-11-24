import { TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core';
import { Store } from '@ngrx/store';
import { TodoService } from '../services/todos.service';
import { Todo } from '@app/features/todos';
import { storeProviderStub, authProviderStub } from '@tests/helper-functions';
import { HttpStub } from '@tests/http.stubs';
import { AuthService } from '~/app/auth';

describe('TodoService', () => {
  let service: TodoService;
  let store: Store<any>;
  let apiService: ApiService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        storeProviderStub,
        { provide: ApiService, useClass: HttpStub },
        authProviderStub
      ]
    });

    service = TestBed.get(TodoService);
    store = TestBed.get(Store);
    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTodos', () => {
    it('should call the api service with /todos', () => {
      const spy = jest.spyOn(apiService, 'get');

      service.loadTodos();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('todos');

      spy.mockReset();
    });
  });

  describe('getTodo', () => {
    it('should make a GET request to the api server with the resource id', () => {
      const spy = jest.spyOn(apiService, 'get');

      service.getTodo('1');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('todos/1');

      spy.mockReset();
    });
  });

  describe('createTodo', () => {
    it('should make a POST request to the api server with the resource to create', () => {
      const spy = jest.spyOn(apiService, 'post');

      const todo: Todo = {
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      } as Todo;

      authService.getDecodedToken = jest.fn(() => {
        return {
          sub: '1'
        };
      });
      service.createTodo(todo);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual('todos');
      expect(spy.mock.calls[0][1]).toEqual(todo);

      spy.mockReset();
    });
  });

  describe('updateTodo', () => {
    it('should make a PUT request to the api server with the resource to update', () => {
      const spy = jest.spyOn(apiService, 'put');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      service.updateTodo(todo);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual('todos');
      expect(spy.mock.calls[0][1]).toEqual(todo);

      spy.mockReset();
    });
  });

  describe('deleteTodo', () => {
    it('should make a DELETE request to the api server with the resource to update', () => {
      const spy = jest.spyOn(apiService, 'delete');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      service.deleteTodo(todo);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual('todos');
      expect(spy.mock.calls[0][1]).toEqual(todo);

      spy.mockReset();
    });
  });
});