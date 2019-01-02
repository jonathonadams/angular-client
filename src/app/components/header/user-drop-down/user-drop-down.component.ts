import {
  Component,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@app-core/theme/theme.service';
import { User, UserService } from '@features/users';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';

// For the purpose of theming, view encapulation has been set to none.
// This element is only inserted into the overlay container,
// The overlay container is a sibling of the app-root, not a child.
// To prevent any styling clash, make sure to use unique class selectors for your components
// eg do not use generc selectors life "container" etc
@Component({
  selector: 'demo-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserDropDownComponent {
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<void>();

  public darkTheme$: Observable<boolean>;
  public authenticatedUser$: Observable<User>;

  constructor(private theme: ThemeService, private facade: AuthFacade) {
    this.darkTheme$ = this.theme.darkTheme$;
    this.authenticatedUser$ = this.facade.authenticatedUser$;
  }
}
