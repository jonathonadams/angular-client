import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { TodosComponent } from './todos.component';
import { TodoService } from '../todos.service';
import { createSpyObj, storeProviderStub } from '@test/helper-functions';
import { LoadTodos } from '../todos.actions';
import { Todo } from '../todos.model';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let store: Store<any>;
  let todoService: TodoService;
  const todoSpy = createSpyObj('TodoService', ['todo$', 'saveTodo']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [storeProviderStub, { provide: TodoService, useValue: todoSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.get(Store);
    todoService = TestBed.get(TodoService);
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
      const action = new LoadTodos();
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('selectTodo', () => {
    it('should be called when the TodoList component slected event is raised', () => {
      const spy = jest.spyOn(component, 'selectTodo');

      const todo: Todo = {
        id: 1,
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

    it('should set the slectedTodo property with the called argument', () => {
      expect(component.selectedTodo).not.toBeDefined();

      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };

      const todoList = debugEl.query(By.css('client-todo-list'));

      todoList.triggerEventHandler('selected', todo);

      expect(component.selectedTodo).toBeDefined();
      expect(component.selectedTodo).toEqual(todo);
    });
  });

  describe('saveTodo', () => {
    it('should be raised when clientTodoDetailComponent.save() is raised', () => {
      const spy = jest.spyOn(todoService, 'saveTodo');

      const todo: Todo = {
        id: 1,
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

    it('should call todoService.saveTodo()', () => {
      const spy = jest.spyOn(todoService, 'saveTodo');

      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();
      component.saveTodo(todo);

      expect(spy).toHaveBeenCalled();

      // Both of the below assetions can be used as an sertion
      // on the calls.
      // The second version is aseting again the first argument the first call
      expect(spy).toHaveBeenCalledWith(todo);
      expect(spy.mock.calls[0][0]).toBe(todo);

      spy.mockReset();
    });

    it('should call the resteTodo method', () => {
      const spy = jest.spyOn(component, 'resetTodo');

      const todo: Todo = {
        id: 1,
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

  describe('resetTodo', () => {
    it('should be called when the TodoDetailComponent cancelled event is raised', () => {
      const spy = jest.spyOn(component, 'resetTodo');

      expect(spy).not.toHaveBeenCalled();

      const todoDetail = debugEl.query(By.css('client-todo-detail'));

      todoDetail.triggerEventHandler('cancelled', null);

      expect(spy).toHaveBeenCalled();
      spy.mockReset();
    });

    it('should reset the selectedTodo.property', () => {
      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.selectedTodo = todo;

      expect(component.selectedTodo.id).toEqual(1);

      component.resetTodo();

      expect(component.selectedTodo.id).toEqual(null);
      expect(component.selectedTodo.title).toEqual('');
    });
  });
});
