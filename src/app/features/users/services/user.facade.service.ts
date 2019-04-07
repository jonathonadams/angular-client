import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import {
  LoadUsers,
  SelectUser,
  ClearSelectedUser,
  UpdateUser,
  DeleteUser
} from '../actions/user.actions';
import { selectAllUsers, selectCurrentUser } from '../reducers/user.reducer';

@Injectable()
export class UserFacade {
  public user$: Observable<User[]>;
  public selectedUser$: Observable<User>;

  constructor(private store: Store<any>) {
    this.user$ = this.store.pipe(select(selectAllUsers));
    this.selectedUser$ = this.store.pipe(select(selectCurrentUser));
  }

  loadUsers() {
    this.store.dispatch(new LoadUsers());
  }

  selectUser(user: User) {
    this.store.dispatch(new SelectUser(user.id));
  }

  clearSelected() {
    this.store.dispatch(new ClearSelectedUser());
  }

  updateUser(user: User) {
    this.store.dispatch(new UpdateUser(user));
  }

  deleteUser(user: User) {
    this.store.dispatch(new DeleteUser(user));
  }
}
