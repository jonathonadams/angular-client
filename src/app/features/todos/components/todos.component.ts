import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/reducers';
import { Observable } from 'rxjs';
import { Todo } from '../todos.model';
import { TodoService } from '../services/todos.service';
import { LoadTodos, DeleteTodo } from '../actions/todos.actions';

@Component({
  selector: 'client-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  public userTodo$: Observable<Todo[]>;
  public selectedTodo: Todo;

  constructor(private store: Store<AppState>, private todoService: TodoService) {
    this.userTodo$ = this.todoService.userTodo$;
  }

  ngOnInit() {
    this.store.dispatch(new LoadTodos());
  }

  public selectTodo(event: Todo) {
    this.selectedTodo = event;
  }

  public saveTodo(todo: Todo) {
    this.todoService.saveTodo(todo);
    this.resetTodo();
  }

  public resetTodo() {
    this.selectedTodo = {} as Todo;
  }

  public deleteTodo(todo: Todo) {
    // Reset the todo if it is the current selected todo
    if (this.selectedTodo && todo.id === this.selectedTodo.id) {
      this.resetTodo();
    }
    this.store.dispatch(new DeleteTodo(todo));
  }
}
