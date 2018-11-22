import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { SharedModule } from '@app/shared';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDropDownComponent } from './header/user-drop-down/user-drop-down.component';

const COMPONENTS = [HeaderComponent, DashboardComponent, UserDropDownComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [ComponentsRoutingModule, SharedModule],
  exports: COMPONENTS,
  entryComponents: [UserDropDownComponent]
})
export class ComponentsModule {}
