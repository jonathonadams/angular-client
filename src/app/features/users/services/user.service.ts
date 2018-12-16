import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '~/app/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private resourceUrl = 'users';

  constructor(private api: ApiService) {}

  getAllUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.resourceUrl);
  }

  getOneUser(id: string): Observable<User> {
    return this.api.getOne<User>(this.resourceUrl, id);
  }
}
