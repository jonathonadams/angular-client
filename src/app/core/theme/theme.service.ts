import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthFacade } from '~/app/auth/services/auth.facade.service';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  // Use a behavior subject as the state needs to be emitted
  // When components subscribe to it
  private darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  private subscription: Subscription;
  private userSubscription: Subscription;

  constructor(overlayContainer: OverlayContainer, private facade: AuthFacade) {
    // listen to the changes of the theme service
    // And add the dark-theme to the global overlay element
    this.subscription = this.darkTheme$.subscribe(active => {
      active
        ? overlayContainer.getContainerElement().classList.add('dark-theme')
        : overlayContainer.getContainerElement().classList.remove('dark-theme');
    });

    this.userSubscription = this.facade.authenticatedUser$
      .pipe(
        filter(user => user !== undefined),
        distinctUntilChanged()
      )
      .subscribe(user => this.darkTheme.next(user.settings.darkMode));
  }

  public setActiveStatus(active: boolean): void {
    this.darkTheme.next(active);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
