import { NgModule } from '@angular/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavListComponent } from './main-nav/nav-list/nav-list.component';
import { SharedModule } from '@app/shared';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDropDownComponent } from './header/user-drop-down/user-drop-down.component';

const COMPONENTS = [
  MainNavComponent,
  NavListComponent,
  HeaderComponent,
  DashboardComponent,
  UserDropDownComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [ComponentsRoutingModule, SharedModule],
  exports: [],
  entryComponents: [UserDropDownComponent]
})
export class ComponentsModule {}
