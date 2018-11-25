import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '@shared/shared.module.tns';

const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [SharedModule],
  exports: COMPONENTS
})
export class ComponentsModule {}
