import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Todo } from '@app/features/todos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'demo-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDetailComponent {
  public todoForm: FormGroup;
  public selectedTodo: Todo;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  @Output()
  saved = new EventEmitter<Todo>();
  @Output()
  cancelled = new EventEmitter<void>();

  @Input()
  set todo(todo: Todo) {
    this.selectedTodo = todo ? { ...todo } : undefined;
    this.todoForm.reset(todo);
  }

  onSubmit({ value, valid }) {
    if (valid) {
      this.saved.emit({ ...this.selectedTodo, ...value });
    }
  }

  clearTodo() {
    this.cancelled.emit();
  }
}
