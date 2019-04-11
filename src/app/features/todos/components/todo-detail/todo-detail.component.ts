import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Todo } from '@app/features/todos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodosFacade } from '../../services/todos.facade';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'demo-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnDestroy {
  public todoForm: FormGroup;
  public selectedTodo$: Observable<Todo>;
  public subscription: Subscription;

  @Output()
  saved = new EventEmitter<Todo>();
  @Output()
  cancelled = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private facade: TodosFacade) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.selectedTodo$ = this.facade.selectedTodo$;

    this.subscription = this.selectedTodo$
      .pipe(filter(val => val !== undefined))
      .subscribe(todo => {
        this.todoForm.reset(todo);
      });
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.selectedTodo$.pipe(take(1)).subscribe(selectedTodo => {
        this.saved.emit({ ...selectedTodo, ...value });
        this.todoForm.reset();
      });
    }
  }

  clearTodo() {
    this.todoForm.reset();
    this.cancelled.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
