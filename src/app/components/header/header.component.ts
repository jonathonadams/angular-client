import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth/auth.actions';
import { ThemeService } from '@app/core/theme/theme.service';
import { OverlayService } from '@app/shared';
import { OverlayRef } from '@angular/cdk/overlay';
import { UserDropDownComponent } from './user-drop-down/user-drop-down.component';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private overlayRef: OverlayRef;

  constructor(
    private el: ElementRef,
    private store: Store<any>,
    private theme: ThemeService,
    private overlay: OverlayService
  ) {}
  @Output() toggleNavigation = new EventEmitter<void>();

  public toggleDarkTheme(active: boolean): void {
    this.theme.toggle(active);
  }

  public showUserDropDown() {
    const { overlayRef, componentRef } = this.overlay.createOverlay<UserDropDownComponent>(
      this.el,
      UserDropDownComponent
    );

    componentRef.instance.toggleDarkTheme.subscribe(active => {
      this.theme.toggle(active);
    });

    componentRef.instance.logout.subscribe(() => {
      overlayRef.dispose();
      this.store.dispatch(new Logout());
    });
  }
}
