import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos.model';
import { TodosFacade } from '../services/todos.facade';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'client-todos',
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
    private service: TodosService
  ) {
    this.userTodo$ = this.facade.userTodo$;
    this.selectedTodo$ = this.facade.selectedTodo$;
  }

  ngOnInit() {
    this.facade.loadTodos();
    this.route.paramMap
      .pipe(map(paramMap => paramMap.get('id')))
      .subscribe(id => this.selectTodo(id));
  }

  public navigateTo(id: string): void {
    this.service.navigateTo(id);
  }

  public selectTodo(id: string) {
    this.facade.selectTodo(id);
  }

  public saveTodo(todo: Todo) {
    this.facade.saveTodo(todo);
    this.clearTodo();
  }

  public deleteTodo(id: string) {
    this.facade.deleteTodo(id);
  }

  public clearTodo() {
    this.facade.clearSelected();
    this.service.navigateTo();
  }
}
