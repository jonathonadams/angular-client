import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@app/shared';

const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [SharedModule, ComponentsRoutingModule],
  exports: []
})
export class ComponentsModule {}
