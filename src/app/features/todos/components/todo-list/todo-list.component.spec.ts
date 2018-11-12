import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';
import { Todo } from '@app/features/todos';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <client-todo-list [todos]="todos"> </client-todo-list>
  `
})
export class TestParentComponent {
  todos: Todo[];
}

describe('TodoListComponent ', () => {
  let parentComponent: TestParentComponent;
  let parentFixture: ComponentFixture<TestParentComponent>;
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let debugEl: DebugElement;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestParentComponent, TodoListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(TestParentComponent);
    parentComponent = parentFixture.componentInstance;
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    nativeEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('todos', () => {
    it('should render a list of todos when set', () => {
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

      component.todos = todos;
      fixture.detectChanges();

      expect(nativeEl).toMatchSnapshot();
    });
  });

  describe('selected', () => {
    it('should be raised with the selected todo when the card is clicked', fakeAsync(() => {
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

      component.todos = todos;
      fixture.detectChanges();

      let todo: Todo;
      component.selected.subscribe(event => {
        todo = event;
      });

      const matCardList = debugEl.queryAll(By.css('mat-card'));
      matCardList[0].triggerEventHandler('click', null);

      tick();

      expect(todo).toEqual(todos[0]);
    }));
  });

  describe('deleted', () => {
    it('should be raised with the selected todo when the delete icon is clicked', fakeAsync(() => {
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

      component.todos = todos;
      fixture.detectChanges();

      let todo: Todo;
      component.deleted.subscribe(event => {
        todo = event;
      });

      const deleteButtons = debugEl.queryAll(By.css('mat-card .button'));
      deleteButtons[0].triggerEventHandler('click', null);

      tick();

      expect(todo).toEqual(todos[0]);
    }));
  });
});
