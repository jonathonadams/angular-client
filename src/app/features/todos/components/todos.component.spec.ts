import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TodosComponent } from './todos.component';
import { Todo } from '../models/todos.model';
import { createSpyObj } from '~/tests/helper-functions';
import { TodosFacade } from '../services/todos.facade';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let todoFacade: TodosFacade;
  const todoFacadeSpy = createSpyObj('TodosFacade', [
    'userTodo$',
    'selectedTodo$',
    'loadTodos',
    'selectTodo',
    'saveTodo',
    'deleteTodo',
    'clearSelected'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [{ provide: TodosFacade, useValue: todoFacadeSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    todoFacade = TestBed.get(TodosFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should send a request to load todos', () => {
      component.ngOnInit();
      expect(todoFacade.loadTodos).toHaveBeenCalled();
    });
  });

  describe('selectTodo', () => {
    it('should be called when the TodoList component selected event is raised', () => {
      const spy = jest.spyOn(component, 'selectTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      const todoList = debugEl.query(By.css('client-todo-list'));

      todoList.triggerEventHandler('selected', todo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo);
      spy.mockReset();
    });

    it('should call the facade selecTodo method with the raised event', () => {
      const spy = jest.spyOn(todoFacade, 'selectTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      const todoList = debugEl.query(By.css('client-todo-list'));

      todoList.triggerEventHandler('selected', todo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo);
      spy.mockReset();
    });
  });

  describe('saveTodo', () => {
    it('should be raised when clientTodoDetailComponent.save() is raised', () => {
      const spy = jest.spyOn(component, 'saveTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();

      const detailComponet: DebugElement = debugEl.query(By.css('client-todo-detail'));

      detailComponet.triggerEventHandler('saved', todo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo);
      spy.mockReset();
    });

    it('should call facade saveTodo method with the raised event', () => {
      const spy = jest.spyOn(todoFacade, 'saveTodo');
      spy.mockReset();

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();
      component.saveTodo(todo);

      expect(spy).toHaveBeenCalled();

      // Both of the below assetions can be used as an sertion
      // on the calls.
      // The second version is aseting against the first argument the first call
      expect(spy).toHaveBeenCalledWith(todo);
      expect(spy.mock.calls[0][0]).toBe(todo);

      spy.mockReset();
    });

    it('should call the clearTodo method', () => {
      const spy = jest.spyOn(component, 'clearTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();

      component.saveTodo(todo);

      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    });
  });

  describe('clearTodo', () => {
    it('should be called when the TodoDetailComponent cancelled event is raised', () => {
      const spy = jest.spyOn(component, 'clearTodo');

      expect(spy).not.toHaveBeenCalled();

      const todoDetail = debugEl.query(By.css('client-todo-detail'));

      todoDetail.triggerEventHandler('cancelled', null);

      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    });

    it('should call the facade clearSelected method', () => {
      const spy = jest.spyOn(todoFacade, 'clearSelected');
      spy.mockReset();
      expect(spy).not.toHaveBeenCalled();
      component.clearTodo();
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    });
  });

  describe('deletTodo', () => {
    it('should be called with when the TodoListComponent cancelled event is raised with the given event', () => {
      const spy = jest.spyOn(component, 'deleteTodo');
      spy.mockReset();

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();

      const todoList = debugEl.query(By.css('client-todo-list'));

      todoList.triggerEventHandler('delete', todo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo);
      spy.mockReset();
    });

    it('should call the facade deleteTodo method with the raised event', () => {
      const spy = jest.spyOn(todoFacade, 'deleteTodo');
      spy.mockReset();
      expect(spy).not.toHaveBeenCalled();

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.deleteTodo(todo);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo);
      spy.mockReset();
    });
  });
});
