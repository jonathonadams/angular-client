import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todos.model';
import { TodosFacade } from '../services/todos.facade';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'client-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  public userTodo$: Observable<Todo[]>;
  public selectedTodo: Todo;

  constructor(private facade: TodosFacade) {
    this.userTodo$ = this.facade.userTodo$;
  }

  ngOnInit() {
    this.facade.loadTodos();
  }

  public selectTodo(todo: Todo) {
    this.selectedTodo = { ...todo };
  }

  public saveTodo(todo: Todo) {
    if (this.selectedTodo) {
      // Editing a current one
      this.facade.updateTodo({ ...this.selectedTodo, ...todo });
    } else {
      // It is a new todo, set completed to false
      this.facade.createTodo({ ...todo, completed: false });
    }
    this.resetTodo();
  }

  public resetTodo() {
    this.selectedTodo = undefined;
  }

  public deleteTodo(todo: Todo) {
    this.facade.deleteTodo(todo);
    this.resetTodo();
  }
}
