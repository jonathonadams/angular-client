import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [],
  exports: COMPONENTS
})
export class ComponentsModule {}
