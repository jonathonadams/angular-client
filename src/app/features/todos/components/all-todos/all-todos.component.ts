import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { Todo, TodoFilterStatus } from '../../models/todos.model';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'demo-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllTodosComponent implements OnInit {
  @ViewChild('todoSearch') searchInput: ElementRef<HTMLInputElement>;

  @Input()
  public todo$: Observable<Todo[]>;
  @Input()
  public todoFilter$: Observable<TodoFilterStatus>;
  @Output()
  public selected = new EventEmitter<Todo>();
  @Output()
  public delete = new EventEmitter<Todo>();
  @Output()
  public updated = new EventEmitter<Todo>();
  @Output()
  public filterChanged = new EventEmitter<TodoFilterStatus>();

  public filterOptions = [
    { display: 'All', value: TodoFilterStatus.All },
    { display: 'Completed', value: TodoFilterStatus.Completed },
    { display: 'In Completed', value: TodoFilterStatus.InCompleted }
  ];

  ngOnInit() {
    const searchValues = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged()
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  filterOptionsChanged(event: MatSelectChange) {
    this.filterChanged.emit(event.value);
  }
}
