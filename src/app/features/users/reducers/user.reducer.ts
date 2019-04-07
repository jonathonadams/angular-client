import { User } from '../models/user.model';
import { UserActionUnion, UserActionTypes } from '../actions/user.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UsersEntityState extends EntityState<User> {
  selectedUserId: string | null;
  authenticatedUserId: string | null;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialSate: UsersEntityState = adapter.getInitialState({
  selectedUserId: null,
  authenticatedUserId: null
});

export function usersReducer(
  state: UsersEntityState = initialSate,
  action: UserActionUnion
): UsersEntityState {
  switch (action.type) {
    case UserActionTypes.LoadAuthenticatedSuccess:
      return adapter.upsertOne(action.payload, state);

    case UserActionTypes.SelectAuthenticated:
      return { ...state, authenticatedUserId: action.payload };

    case UserActionTypes.ClearAuthenticated:
      return { ...state, authenticatedUserId: null };

    case UserActionTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);

    case UserActionTypes.CreateSuccess:
      return adapter.addOne(action.payload, state);

    case UserActionTypes.UpdateSuccess:
      return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);

    case UserActionTypes.DeleteSuccess:
      return adapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}

export const selectUserState = createFeatureSelector<UsersEntityState>('userState');

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers
} = adapter.getSelectors(selectUserState);

export const selectCurrentUserId = createSelector(
  selectUserState,
  (state: UsersEntityState) => state.selectedUserId
);
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);

export const selectAuthenticatedUserId = createSelector(
  selectUserState,
  (state: UsersEntityState) => state.authenticatedUserId
);
export const selectAuthenticatedUser = createSelector(
  selectUserEntities,
  selectAuthenticatedUserId,
  (userEntities, authenticatedUserId) => userEntities[authenticatedUserId]
);
