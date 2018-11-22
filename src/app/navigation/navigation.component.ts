import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/auth.actions';

@Component({
  selector: 'client-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  constructor(private store: Store<any>) {}
  public navLinks = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' }
  ];

  logout() {
    this.store.dispatch(new Logout());
  }
}
