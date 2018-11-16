import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '@app/core/theme/theme.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'client-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss']
})
export class UserDropDownComponent {
  private darkTheme$: Observable<boolean>;
  constructor(private theme: ThemeService) {
    this.darkTheme$ = this.theme.darkTheme$;
  }
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();
}
