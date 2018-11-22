import { Component, Input } from '@angular/core';

@Component({
  selector: 'client-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Input()
  public navLinks;
}
