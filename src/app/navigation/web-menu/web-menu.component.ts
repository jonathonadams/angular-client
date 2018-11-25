import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'client-web-menu',
  templateUrl: './web-menu.component.html',
  styleUrls: ['./web-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebMenuComponent {
  @Input()
  public navLinks;

  routerAnimations(router: RouterOutlet) {
    return router.activatedRouteData['animation'] || 'initial';
  }
}
