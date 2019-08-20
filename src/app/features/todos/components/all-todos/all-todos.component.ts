import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Todo, TodoFilterStatus } from '../../models/todos.model';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'demo-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @ViewChild('todoSearch', { static: true }) searchInput: ElementRef<
    HTMLInputElement
  >;

  @Input()
  public todo$: Observable<Todo[]>;
  @Input()
  public todoFilter$: Observable<TodoFilterStatus>;
  @Output()
  public selected = new EventEmitter<Todo>();
  @Output()
  public delete = new EventEmitter<Todo>();
  @Output()
  public update = new EventEmitter<Todo>();
  @Output()
  public selectFilterChanged = new EventEmitter<TodoFilterStatus>();
  @Output()
  public searchFilterChanged = new EventEmitter<string>();

  public filterOptions = [
    { display: 'All', value: TodoFilterStatus.All },
    { display: 'Completed', value: TodoFilterStatus.Completed },
    { display: 'Incomplete', value: TodoFilterStatus.InCompleted }
  ];

  ngOnInit() {
    this.subscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchFilterChanged.emit(value.trim().toLowerCase());
      });
  }

  filterOptionsChanged(event: MatSelectChange) {
    this.selectFilterChanged.emit(event.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
