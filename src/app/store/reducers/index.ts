export { metaReducers } from './meta-reducers';
import { Action, ActionReducerMap } from '@ngrx/store';
import { User, usersReducer } from '@features/users';

// Some state actions include a payload to update the new state
// Exten the Action type to include the payload.
export interface ActionWithPayload<T> extends Action {
  readonly payload: T;
}

// The interface of the AppState
export interface AppState {
  user: User;
}

// A map of all the reducers
export const reducers: ActionReducerMap<AppState> = {
  user: usersReducer
};
