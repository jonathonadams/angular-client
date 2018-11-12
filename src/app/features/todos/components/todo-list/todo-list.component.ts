import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '@app/features/todos';

@Component({
  selector: 'client-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input()
  todos: Todo[];
  @Output()
  selected = new EventEmitter<Todo>();
  @Output()
  deleted = new EventEmitter<Todo>();
}
