import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth/auth.actions';

@Component({
  selector: 'client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store<any>) {}
  @Output() toggleNavigation = new EventEmitter<void>();

  logout() {
    this.store.dispatch(new Logout());
  }
}
