import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '~/app/store';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { selectUser } from './user.reducer';
import { ApiService } from '~/app/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resourceUrl = 'users';
  public user$: Observable<User>;
  constructor(private store: Store<AppState>, private api: ApiService) {
    this.user$ = this.store.pipe(select(selectUser));
  }

  loadUser(id: string): Observable<User> {
    return this.api.getOne<User>(this.resourceUrl, id);
  }
}
