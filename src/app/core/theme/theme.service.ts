import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  // Use a behaviour subject as the state needs to be emited
  // When components subscribe to it
  private darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  private subscription: Subscription;

  constructor(overlayContainer: OverlayContainer) {
    // listen to the changes of the theme service
    // And add the dark-theme to the global overlay element
    this.subscription = this.darkTheme$.subscribe(active => {
      active
        ? overlayContainer.getContainerElement().classList.add('dark-theme')
        : overlayContainer.getContainerElement().classList.remove('dark-theme');
    });
  }

  public setActiveStatus(active: boolean): void {
    this.darkTheme.next(active);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
