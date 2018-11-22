import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [ComponentsRoutingModule],
  exports: []
})
export class ComponentsModule {}
