import { NgModule } from '@angular/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoModule } from '../features/todos';

const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [ComponentsRoutingModule, TodoModule],
  exports: []
})
export class ComponentsModule {}
