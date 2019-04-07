import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TodosComponent } from './todos.component';
import { Todo } from '../models/todos.model';
import { createSpyObj } from '~/tests/helper-functions';
import { TodosFacade } from '../services/todos.facade';
import { TodosService } from '../services/todos.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '~/tests/activated-router.stubs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;
  let todoFacade: TodosFacade;
  let todoService: TodosService;
  let route: ActivatedRouteStub;

  const todoFacadeSpy = createSpyObj('TodosFacade', [
    'userTodo$',
    'selectedTodo$',
    'loadTodos',
    'selectTodo',
    'saveTodo',
    'deleteTodo',
    'clearSelected'
  ]);

  const todoServiceSpy = createSpyObj('TodosService', ['navigateTo']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [
        { provide: TodosFacade, useValue: todoFacadeSpy },
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        { provide: TodosService, useValue: todoServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    todoFacade = TestBed.get(TodosFacade);
    todoService = TestBed.get(TodosService);
    route = TestBed.get(ActivatedRoute);
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
    it('should be called when the url param id is changed', fakeAsync(() => {
      // Subscribing to the paramMap observable happens on init
      component.ngOnInit();

      const spy = jest.spyOn(component, 'selectTodo');
      spy.mockReset();

      expect(spy).not.toHaveBeenCalled();

      route.setParamMap({ id: 5 });

      tick();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(5);

      spy.mockReset();
    }));

    it('should call the facade selecTodo method with the raised event', () => {
      const spy = jest.spyOn(todoFacade, 'selectTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.selectTodo(todo.id);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(todo.id);
      spy.mockReset();
    });
  });

  describe('saveTodo', () => {
    it('should be raised when TodoDetailComponent.save() is raised', () => {
      const spy = jest.spyOn(component, 'saveTodo');

      const todo: Todo = {
        id: '1',
        userId: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      expect(spy).not.toHaveBeenCalled();

      const detailComponet: DebugElement = debugEl.query(By.css('demo-todo-detail'));

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

      const todoDetail = debugEl.query(By.css('demo-todo-detail'));

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

      const todoList = debugEl.query(By.css('demo-todo-list'));

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
