import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';
import { Todo } from '@app/features/todos';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <demo-todo-list [todos]="todos"> </demo-todo-list>
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
          id: '1',
          userId: '1',
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: '1',
          userId: '1',
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
          id: '1',
          userId: '1',
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: '2',
          userId: '1',
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      component.todos = todos;
      fixture.detectChanges();

      let id: string;
      component.selected.subscribe(event => {
        id = event;
      });

      const matCardList = debugEl.queryAll(By.css('mat-card'));
      matCardList[0].triggerEventHandler('click', null);

      tick();

      expect(id).toEqual(todos[0].id);
    }));
  });

  describe('deleted', () => {
    it('should be raised with the selected todo when the delete icon is clicked', fakeAsync(() => {
      const todos: Todo[] = [
        {
          id: '1',
          userId: '1',
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: '2',
          userId: '1',
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      component.todos = todos;
      fixture.detectChanges();

      let id: string;
      component.delete.subscribe(event => {
        id = event;
      });

      const deleteButtons = debugEl.queryAll(By.css('mat-card .button'));
      deleteButtons[0].triggerEventHandler('click', null);

      tick();

      expect(id).toEqual(todos[0].id);
    }));
  });
});
