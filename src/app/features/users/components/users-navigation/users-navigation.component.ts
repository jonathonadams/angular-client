import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-users-navigation',
  templateUrl: './users-navigation.component.html',
  styleUrls: ['./users-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersNavigationComponent {
  public navLinks: any[] = [{ path: '/users/profile', label: 'Profile' }];
}
