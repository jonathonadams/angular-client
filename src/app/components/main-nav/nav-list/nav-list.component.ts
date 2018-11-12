import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'client-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavListComponent {
  @Input()
  public navLinks;
}
