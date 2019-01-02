import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth/actions/auth.actions';
import { ROUTER_ANIMATIONS } from './router-animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'demo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ROUTER_ANIMATIONS]
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

  routerAnimations(router: RouterOutlet) {
    return router.activatedRouteData['animation'] || 'initial';
  }
}
