import { ActionWithPayload } from '../reducers';

export enum GlobalActionTypes {
  DisplayNotification = '[Global] Display Notification'
}

export class DisplayNotification
  implements ActionWithPayload<{ message: string; duration?: number }> {
  readonly type = GlobalActionTypes.DisplayNotification;
  constructor(public payload: { message: string; duration?: number }) {}
}
