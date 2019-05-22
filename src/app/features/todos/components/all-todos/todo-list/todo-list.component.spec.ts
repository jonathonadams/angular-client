import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';
import { Todo } from '@app/features/todos';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <demo-todo-list [todo]="todo"> </demo-todo-list>
  `
})
export class TestParentComponent {
  todo: Todo;
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

  describe('todo', () => {
    it('should displays the todo details when set', () => {
      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.todo = todo;
      fixture.detectChanges();

      expect(nativeEl).toMatchSnapshot();
    });
  });

  describe('selected', () => {
    it('should be raised with current todo when the card is clicked', fakeAsync(() => {
      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.todo = todo;
      fixture.detectChanges();

      let selectedTodo: Todo;
      component.selected.subscribe(event => {
        selectedTodo = event;
      });

      const matCardList = debugEl.queryAll(By.css('mat-card'));
      matCardList[0].triggerEventHandler('click', null);

      tick();

      expect(selectedTodo).toEqual(todo);
    }));
  });

  describe('delete', () => {
    it('should be raised with the current todo when the delete icon is clicked', fakeAsync(() => {
      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.todo = todo;
      fixture.detectChanges();

      let deletedTodo: Todo;
      component.delete.subscribe(event => {
        deletedTodo = event;
      });

      const deleteButtons = debugEl.queryAll(By.css('mat-card .button'));
      deleteButtons[0].triggerEventHandler('click', { stopPropagation() {} });

      tick();

      expect(deletedTodo).toEqual(todo);
    }));
  });
  describe('update', () => {
    it('should be raised when updateTodoCompletedStatus is called', fakeAsync(() => {
      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.todo = todo;
      fixture.detectChanges();

      let updatedTodo: Todo;
      component.update.subscribe(event => {
        updatedTodo = event;
      });

      component.updateTodoCompletedStatus(todo, true);

      tick();

      expect(updatedTodo).toEqual(todo);
    }));
    it('should be raised with the updated completed status', fakeAsync(() => {
      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      component.todo = todo;
      fixture.detectChanges();

      let updatedTodo: Todo;
      component.update.subscribe(event => {
        updatedTodo = event;
      });

      component.updateTodoCompletedStatus(todo, false);

      tick();

      expect(updatedTodo.completed).not.toEqual(todo.completed);
    }));
  });
});
