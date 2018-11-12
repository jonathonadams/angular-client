import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Todo } from '@app/features/todos';
import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('todo', () => {
    it('should set the selectedTodo property when set', () => {
      expect(component.selectedTodo).not.toBeDefined();

      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };
      component.todo = todo;

      expect(component.selectedTodo).toBeDefined();
    });

    it('should make a copy of the property value', () => {
      expect(component.selectedTodo).not.toBeDefined();

      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };
      component.todo = todo;

      expect(component.selectedTodo).toBeDefined();

      // Note that we want to check the deep equality of the object
      // So we check that the objects are equal with .toEqual
      // and deepy equal with .toBe
      expect(component.selectedTodo).toEqual(todo);
      expect(component.selectedTodo).not.toBe(todo);
    });
  });
  describe('saved', () => {
    it('should be raised when the saved button is clicked', fakeAsync(() => {
      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };
      component.todo = todo;
      fixture.detectChanges();

      let emittedTodo: Todo;
      component.saved.subscribe(event => {
        emittedTodo = event;
      });

      const buttonList = debugEl.queryAll(By.css('button'));
      buttonList[0].triggerEventHandler('click', null);

      tick();

      expect(emittedTodo).toEqual(todo);
    }));
  });

  describe('cancelled', () => {
    it('should be raised when the cancel button is clicked', fakeAsync(() => {
      const todo: Todo = {
        id: 1,
        title: 'some title',
        description: 'some description',
        completed: true
      };
      component.todo = todo;
      fixture.detectChanges();

      let emittedTodo: Todo;
      component.cancelled.subscribe(event => {
        emittedTodo = event;
      });

      const deleteButtons = debugEl.queryAll(By.css('button'));
      deleteButtons[1].triggerEventHandler('click', null);

      tick();

      expect(emittedTodo).toEqual(todo);
    }));
  });
});
