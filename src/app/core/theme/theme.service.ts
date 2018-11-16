import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Use a behaviour subject as the state needs to be emited
  // When components subscribe to it
  private darkTheme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public darkTheme$: Observable<boolean> = this.darkTheme.asObservable();

  public toggle(active: boolean): void {
    this.darkTheme.next(active);
  }
}
