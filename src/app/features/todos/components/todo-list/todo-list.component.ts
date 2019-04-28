import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '@app/features/todos';

@Component({
  selector: 'demo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input()
  todo: Todo;
  @Output()
  selected = new EventEmitter<Todo>();
  @Output()
  delete = new EventEmitter<Todo>();
  @Output()
  updated = new EventEmitter<Todo>();

  public updateTodoCompletedStatus(todo: Todo, completed: boolean) {
    const updatedTodo: Todo = { ...todo, completed };
    this.updated.emit(updatedTodo);
  }
}
