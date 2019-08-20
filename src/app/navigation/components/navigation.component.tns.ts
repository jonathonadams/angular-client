import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth/actions/auth.actions';
import { ROUTER_ANIMATIONS } from './router-animation';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ROUTER_ANIMATIONS]
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild(RadSideDrawerComponent, { static: true })
  public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;

  constructor(
    private store: Store<any>,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
  public navLinks = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/todos', icon: 'list', label: 'Todos' }
  ];

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.cd.detectChanges();
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

  public openDrawer() {
    this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
    this.drawer.closeDrawer();
  }

  public navigatTo(path: string) {
    this.onCloseDrawerTap();
    this.router.navigate([path]);
  }
}
