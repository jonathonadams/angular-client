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

@Component({
  selector: 'demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    private el: ElementRef,
    private store: Store<any>,
    private themeService: ThemeService,
    private overlay: OverlayService
  ) {}
  @Output() toggleNavigation = new EventEmitter<void>();

  public toggleDarkTheme(active: boolean): void {
    this.themeService.setActiveStatus(active);
  }

  public showUserDropDown() {
    const { overlayRef, componentRef } = this.overlay.createOverlay<UserDropDownComponent>(
      this.el,
      UserDropDownComponent
    );

    componentRef.instance.toggleDarkTheme.subscribe(active => {
      this.themeService.setActiveStatus(active);
    });

    componentRef.instance.logout.subscribe(() => {
      overlayRef.dispose();
      this.store.dispatch(new Logout());
    });
  }
}
