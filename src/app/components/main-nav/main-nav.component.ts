import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_ANIMATIONS } from './router-animation';

@Component({
  selector: 'client-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ROUTER_ANIMATIONS]
})
export class MainNavComponent {
  public navLinks = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' }
  ];

  prepareRouterState(router: RouterOutlet) {
    return router.activatedRouteData['animation'] || 'initial';
  }
}
