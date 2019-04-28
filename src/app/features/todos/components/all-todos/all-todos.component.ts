import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todos.model';

@Component({
  selector: 'demo-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent {
  @Input()
  public todos: Todo[];
  @Output()
  public selected = new EventEmitter<Todo>();
  @Output()
  public delete = new EventEmitter<Todo>();
}
