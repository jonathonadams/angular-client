import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '@app-core/theme/theme.service';
import { User } from '@features/users';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

// For the purpose of themeing, view encapsulation has been set to none.
// This element is only inserted into the overlay container,
// The overlay container is a sibling of the app-root, not a child.
// To prevent any styling clash, make sure to use unique class selectors for your components
// eg do not use generic selectors life "container" etc
@Component({
  selector: 'demo-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserDropDownComponent {
  @Output() saveUserSettings = new EventEmitter<User>();
  @Output() logout = new EventEmitter<void>();

  public user$: Observable<User>;

  constructor(private facade: AuthFacade, private router: Router) {
    this.user$ = this.facade.authenticatedUser$;
  }

  toggleDarkMode(darkMode: boolean) {
    this.user$.pipe(take(1)).subscribe(user => {
      const userSettings = { darkMode, colors: user.settings.colors };
      this.saveUserSettings.emit({ ...user, settings: userSettings });
    });
  }

  navigateToProfile() {
    this.router.navigate(['/users/profile']);
  }
}
