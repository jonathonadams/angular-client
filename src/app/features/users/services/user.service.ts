import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '~/app/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UserService {
  private resourceUrl = 'users';

  constructor(private api: ApiService, @Inject(DOCUMENT) private document) {}

  public setUserThemeColors(user: User): void {
    this.document
      .querySelector(':root')
      .style.setProperty('--light-primary-color', user.settings.colors.lightPrimary);
    this.document
      .querySelector(':root')
      .style.setProperty('--light-accent-color', user.settings.colors.lightAccent);
    this.document
      .querySelector(':root')
      .style.setProperty('--dark-primary-color', user.settings.colors.darkPrimary);
    this.document
      .querySelector(':root')
      .style.setProperty('--dark-accent-color', user.settings.colors.darkAccent);
  }

  getAllUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.resourceUrl);
  }

  getOneUser(id: string): Observable<User> {
    return this.api.getOne<User>(this.resourceUrl, id);
  }

  updateUser(user: User): Observable<User> {
    return this.api.put<User>(this.resourceUrl, user);
  }
}
