import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { WebMenuComponent } from './web-menu/web-menu.component';
import { ComponentsModule } from '../components/components.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './effects/navigation.effects';

const COMPONENTS = [NavigationComponent, WebMenuComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    NavigationRoutingModule,
    SharedModule,
    ComponentsModule,
    EffectsModule.forFeature([NavigationEffects])
  ],
  exports: []
})
export class NavigationModule {}
