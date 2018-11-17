import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ThemeService } from '@app-core/theme/theme.service';
import { User, UserService } from '@features/users';

// For the purpose of theming, view encapulation has been set to none.
// This element is only inserted into the overlay container,
// The overlay container is a sibling of the app-root, not a child.
// To prevent any styling clash, make sure to use unique class selectors for your components
// eg do not use generc selectors life "container" etc
@Component({
  selector: 'client-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserDropDownComponent {
  @Input() user: User;
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();

  public darkTheme$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(private theme: ThemeService, private userService: UserService) {
    this.darkTheme$ = this.theme.darkTheme$;
    this.user$ = this.userService.user$.pipe(tap(user => console.log(user)));
  }
}
