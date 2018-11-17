import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '~/app/store';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { selectUser } from './user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$: Observable<User>;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(selectUser));
  }
}
