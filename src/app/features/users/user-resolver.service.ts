import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, delay, filter } from 'rxjs/operators';
import { Router, Resolve } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(): Observable<any> {
    return this.userService.user$.pipe(take(1));
    // .pipe(
    // filter(val => val != undefined)
    // delay(5000)
    // );
  }
}
