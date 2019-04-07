import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DisplayNotification } from './actions';

@Injectable({
  providedIn: 'root'
})
export class GlobalFacade {
  constructor(private store: Store<any>) {}

  public displayNotification(message: string, duration?: number) {
    this.store.dispatch(new DisplayNotification({ message, duration }));
  }
}
