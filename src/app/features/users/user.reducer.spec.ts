import { usersReducer } from '@features/users/user.reducer';
import { User } from '@features/users/user.model';
import {
  LoadUserSuccess,
  UpdateUserSuccess,
  DeleteUserSuccess
} from '@features/users/user.actions';

describe('UsersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = usersReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadSucces action', () => {
    it('should add the user to the user state', () => {
      const user = { id: '2', username: 'someUser', emailAddress: 'some@emailAddress.com' } as User;
      const action = new LoadUserSuccess(user);

      const result = usersReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateSucces action', () => {
    it('should update the existing user state', () => {
      const inititalState = {
        id: '1',
        username: 'initialUser',
        emailAddress: 'some@emailAddress.com'
      } as User;
      const user = { id: '1', username: 'updatedName' } as User;
      const action = new UpdateUserSuccess(user);

      const result = usersReducer(inititalState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteSucces action', () => {
    it('should delete the existing user state', () => {
      const inititalState = {
        id: '1',
        username: 'initialUser',
        emailAddress: 'some@emailAddress.com'
      } as User;
      const action = new DeleteUserSuccess();

      const result = usersReducer(inititalState, action);

      expect(result).toMatchSnapshot();
    });
  });
});
