import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './components/navigation.component';
import { ComponentsModule } from '../components/components.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './effects/navigation.effects';
import { NavigationFacade } from './services/navigation.facade.service';

const COMPONENTS = [NavigationComponent];

@NgModule({
  declarations: COMPONENTS,
  providers: [NavigationFacade],
  imports: [
    NavigationRoutingModule,
    SharedModule,
    ComponentsModule,
    EffectsModule.forFeature([NavigationEffects])
  ],
  exports: []
  // schemas: [NO_ERRORS_SCHEMA] --> NativeScipt uses this??
})
export class NavigationModule {}
