import { User } from '../models/user.model';
import { UserActionUnion, UserActionTypes } from '../actions/user.actions';
import { AppState } from '@store/reducers';

export function usersReducer(state: User, action: UserActionUnion): User {
  switch (action.type) {
    case UserActionTypes.LoadSuccess:
      return action.payload;

    case UserActionTypes.UpdateSuccess:
      return Object.assign({}, state, action.payload);

    case UserActionTypes.DeleteSuccess:
      return undefined as User;

    default:
      return state;
  }
}

// A function to select the current investor from the state
export const selectUser = (state: AppState) => state.user;
