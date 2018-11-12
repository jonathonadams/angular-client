import { NgModule } from '@angular/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavListComponent } from './main-nav/nav-list/nav-list.component';
import { SharedModule } from '@app/shared';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const COMPONENTS = [MainNavComponent, NavListComponent, HeaderComponent, DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [ComponentsRoutingModule, SharedModule],
  exports: []
})
export class ComponentsModule {}
