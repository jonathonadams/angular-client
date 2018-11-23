import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { WebMenuComponent } from './web-menu/web-menu.component';
import { ComponentsModule } from '../components/components.module';
import { NavigationRoutingModule } from './navigation-routing.module';

const COMPONENTS = [NavigationComponent, WebMenuComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [NavigationRoutingModule, SharedModule, ComponentsModule],
  exports: []
})
export class NavigationModule {}
