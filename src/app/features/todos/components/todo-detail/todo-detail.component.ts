import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '@app/features/todos';

@Component({
  selector: 'client-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent {
  selectedTodo: Todo;

  @Output()
  saved = new EventEmitter<Todo>();
  @Output()
  cancelled = new EventEmitter<Todo>();

  @Input()
  set todo(value: Todo) {
    // Make sure to create a copy for immutable state
    this.selectedTodo = Object.assign({}, value);
  }
}
