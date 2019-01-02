import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// Unlike the web ThemeService, you can not reference
// the cdk overlay container beucase that references
// dom specific elements

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Use a behaviour subject as the state needs to be emited
  // When components subscribe to it
  private darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  public setActiveStatus(active: boolean): void {
    this.darkTheme.next(active);
  }
}
