import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos.model';
import { TodosFacade } from '../services/todos.facade';
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'demo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {
  public userTodo$: Observable<Todo[]>;
  public selectedTodo$: Observable<Todo>;

  constructor(
    private facade: TodosFacade,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.userTodo$ = this.facade.userTodo$;
    this.selectedTodo$ = this.facade.selectedTodo$;
  }

  ngOnInit() {
    this.facade.loadTodos();
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        filter(id => id !== 'null')
      )
      .subscribe(id => this.selectTodo(id));
  }

  public navigateTo(todo: Todo): void {
    this.facade.selectTodo(todo.id);
    this.location.go(`/todos/${todo.id}`);
  }

  public selectTodo(id: string) {
    this.facade.selectTodo(id);
  }

  public saveTodo(todo: Todo) {
    this.facade.saveTodo(todo);
  }

  public deleteTodo(todo: Todo) {
    this.facade.deleteTodo(todo);
  }

  public clearTodo() {
    this.facade.clearSelected();
    // Also update the url to remove the id without navigating
    this.location.go('/todos');
  }
}
