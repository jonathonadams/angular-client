import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotificationService } from '~/app/core';
import { GlobalActionTypes, DisplayNotification } from './actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalEffects {
  constructor(private action$: Actions, private ns: NotificationService) {}

  @Effect({ dispatch: false })
  showNotification$ = this.action$.pipe(
    ofType<DisplayNotification>(GlobalActionTypes.DisplayNotification),
    tap(action => this.ns.emit(action.payload.message, action.payload.duration))
  );
}
