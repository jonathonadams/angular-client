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

  public selectTodo(todo: Todo) {
    this.selectedTodo = { ...todo };
  }

  public saveTodo(todo: Todo) {
    if (this.selectedTodo) {
      // Editing a current one
      this.todoService.saveTodo({ ...this.selectedTodo, ...todo });
    } else {
      // It is a new todo, set completed to false
      this.todoService.saveTodo({ ...todo, completed: false });
    }
    this.resetTodo();
  }

  public resetTodo() {
    this.selectedTodo = undefined;
  }

  public deleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo));
    this.resetTodo();
  }
}
