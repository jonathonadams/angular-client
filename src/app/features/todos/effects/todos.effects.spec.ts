import { TestBed } from '@angular/core/testing';
import { TodoEffects } from '../effects/todos.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jest-marbles';
import { Todo } from '../todos.model';
import {
  LoadTodosSuccess,
  LoadTodos,
  LoadTodosFail,
  CreateTodo,
  CreateTodoSuccess,
  CreateTodoFail,
  UpdateTodo,
  UpdateTodoSuccess,
  UpdateTodoFail,
  DeleteTodo,
  DeleteTodoSuccess,
  DeleteTodoFail
} from '../actions/todos.actions';
import { TodoService } from '../services/todos.service';
import { createSpyObj, storeProviderStub } from '@test/helper-functions';
import { HttpErrorAction } from '@app/store/effects/error-effects';

describe('TodoEffects', () => {
  let effects: TodoEffects;
  let action$: Observable<any>;
  let todoService: TodoService;
  let mockTodo: Todo;
  const todoServiceSpy = createSpyObj('TodoService', [
    'loadTodos',
    'getTodo',
    'createTodo',
    'updateTodo',
    'deleteTodo'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        storeProviderStub,
        { provide: TodoService, useValue: todoServiceSpy },
        provideMockActions(() => action$)
      ]
    });
    effects = TestBed.get(TodoEffects);
    action$ = TestBed.get(Actions);
    todoService = TestBed.get(TodoService);
    mockTodo = {
      id: 1,
      title: 'some title',
      description: 'some description',
      completed: true
    };
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadTodos$', () => {
    it('should retun a LoadTodoSuccess action with a payload of todos', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: 2,
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      const action = new LoadTodos();
      const completion = new LoadTodosSuccess(todos);

      action$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: todos });
      const expected = cold('--b', { b: completion });

      todoService.loadTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    it('should return a LoadTodosFail action if the service throws', () => {
      const error = new Error('An error occured');
      const action = new LoadTodos();
      const completion = new LoadTodosFail(error);

      action$ = hot('-a--', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      todoService.loadTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    it('should retun a CreateTodoSuccess action with a payload of the created Todo', () => {
      const action = new CreateTodo(mockTodo);
      const completion = new CreateTodoSuccess(mockTodo);

      action$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: mockTodo });
      const expected = cold('--b', { b: completion });

      todoService.createTodo = jest.fn(() => response);

      expect(effects.createTodo$).toBeObservable(expected);
    });

    it('should return a CreateTodoFail action if the service throws', () => {
      const error = new Error('An error occured');
      const action = new CreateTodo(mockTodo);
      const completion = new CreateTodoFail(error);

      action$ = hot('-a--', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      todoService.createTodo = jest.fn(() => response);

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });

  describe('updateTodo$', () => {
    it('should retun a UpdateTodoSuccess action with a payload of the updated Todo', () => {
      const action = new UpdateTodo(mockTodo);
      const completion = new UpdateTodoSuccess(mockTodo);

      action$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: mockTodo });
      const expected = cold('--b', { b: completion });

      todoService.updateTodo = jest.fn(() => response);

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    it('should return a UpdateTodoFail action if the service throws', () => {
      const error = new Error('An error occured');
      const action = new UpdateTodo(mockTodo);
      const completion = new UpdateTodoFail(error);

      action$ = hot('-a--', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      todoService.updateTodo = jest.fn(() => response);

      expect(effects.updateTodo$).toBeObservable(expected);
    });
  });

  describe('deleteTodo$', () => {
    it('should return a DeleteTodoSuccess action with a payload of the deleted Todo', () => {
      const action = new DeleteTodo(mockTodo);
      const completion = new DeleteTodoSuccess(mockTodo);

      action$ = hot('-a-', { a: action });
      const response = cold('-a|', { a: mockTodo });
      const expected = cold('--b', { b: completion });

      todoService.deleteTodo = jest.fn(() => response);

      expect(effects.deleteTodo$).toBeObservable(expected);
    });

    it('should return a DeleteTodoFail action if the service throws', () => {
      const error = new Error('An error occured');
      const action = new DeleteTodo(mockTodo);
      const completion = new DeleteTodoFail(error);

      action$ = hot('-a--', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: completion });

      todoService.deleteTodo = jest.fn(() => response);

      expect(effects.deleteTodo$).toBeObservable(expected);
    });
  });

  describe('todoSaveError$', () => {
    it('should return a HttpError action with the error if the effect throw', () => {
      const error = new Error('An error occured');
      const action = new CreateTodoFail(error);
      const completion = new HttpErrorAction(error);

      action$ = hot('-a--', { a: action });
      const expected = cold('-a', { a: completion });

      expect(effects.todoSaveError$).toBeObservable(expected);
    });
  });
});
