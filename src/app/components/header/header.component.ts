import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth';
import { ThemeService } from '@app/core/theme/theme.service';
import { OverlayService } from '@app/shared';
import { UserDropDownComponent } from './user-drop-down/user-drop-down.component';
import { User } from '~/app/features/users';
import { UserFacade } from '~/app/features/users/services/user.facade.service';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public user$: Observable<User>;
  @Output() toggleNavigation = new EventEmitter<void>();
  constructor(
    private el: ElementRef,
    private store: Store<any>,
    private themeService: ThemeService,
    private userFacade: UserFacade,
    private authFacade: AuthFacade,
    private overlay: OverlayService
  ) {
    this.user$ = this.authFacade.authenticatedUser$;
  }

  public toggleDarkTheme(active: boolean): void {
    this.themeService.setActiveStatus(active);
  }

  public showUserDropDown() {
    const { overlayRef, componentRef } = this.overlay.createOverlay<UserDropDownComponent>(
      this.el,
      UserDropDownComponent
    );

    componentRef.instance.saveUserSettings.subscribe((user: User) => {
      this.userFacade.updateUser(user);
    });

    componentRef.instance.logout.subscribe(() => {
      overlayRef.dispose();
      this.store.dispatch(new Logout());
    });
  }
}
