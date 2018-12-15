import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '@app/features/todos';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'client-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent {
  public todoForm: FormGroup;
  public editing = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  @Output()
  saved = new EventEmitter<Todo>();
  @Output()
  cancelled = new EventEmitter<void>();

  @Input()
  set todo(value: Todo) {
    this.editing = value ? true : false;
    this.todoForm.reset(value);
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.saved.emit(value);
      this.todoForm.reset();
    }
  }

  clearTodo() {
    this.todoForm.reset();
    this.cancelled.emit();
  }
}
