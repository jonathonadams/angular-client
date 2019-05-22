import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Todo } from '@app/features/todos';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { TodosFacade } from '../../services/todos.facade';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'demo-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent implements OnDestroy {
  /**
   * Need to call resetForm() on the FormGroupDirective, not reset() on the formGroup.
   * Otherwise the validators do not get reset
   */
  @ViewChild(FormGroupDirective) formDirective;
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
      description: ['', Validators.required],
      completed: [false]
    });
    this.selectedTodo$ = this.facade.selectedTodo$;

    this.subscription = this.selectedTodo$.subscribe(todo => {
      this.todoForm.reset(todo);
    });
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.selectedTodo$.pipe(take(1)).subscribe(selectedTodo => {
        this.saved.emit({ ...selectedTodo, ...value });
        this.formDirective.resetForm();
      });
    }
  }

  clearTodo() {
    this.formDirective.resetForm();
    this.cancelled.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
