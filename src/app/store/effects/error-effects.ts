import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionWithPayload } from '@store/reducers';
import { NotificationService } from '@app-core/notification.service';

export enum ErrorActions {
  Http = '[Error] Http'
}

export class HttpErrorAction implements ActionWithPayload<any> {
  readonly type = ErrorActions.Http;
  constructor(readonly payload: any) {}
}

@Injectable({
  providedIn: 'root'
})
export class ErrorEffects {
  constructor(private actions$: Actions, private ns: NotificationService) {}

  @Effect({ dispatch: false })
  httpError$ = this.actions$.pipe(
    ofType<HttpErrorAction>(ErrorActions.Http),
    map(action => action.payload),
    tap(() => this.ns.emit('An error has occured.')),
    map(error => console.log(error))
  );
}
