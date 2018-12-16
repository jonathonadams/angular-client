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
  public selectedTodo$: Observable<Todo>;

  constructor(private facade: TodosFacade) {
    this.userTodo$ = this.facade.userTodo$;
    this.selectedTodo$ = this.facade.selectedTodo$;
  }

  ngOnInit() {
    this.facade.loadTodos();
  }

  public selectTodo(todo: Todo) {
    this.facade.selectTodo(todo);
  }

  public saveTodo(todo: Todo) {
    this.facade.saveTodo(todo);
    this.clearTodo();
  }

  public deleteTodo(todo: Todo) {
    this.facade.deleteTodo(todo);
  }

  public clearTodo() {
    this.facade.clearSelected();
  }
}
