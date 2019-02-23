import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './components/navigation.component';
import { ComponentsModule } from '../components/components.module';
import { NavigationRoutingModule } from './navigation-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './effects/navigation.effects';
import { NavigationFacade } from './services/navigation.facade.service';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

const COMPONENTS = [NavigationComponent];

@NgModule({
  providers: [NavigationFacade],
  imports: [
    NavigationRoutingModule,
    NativeScriptUISideDrawerModule,
    SharedModule,
    ComponentsModule,
    EffectsModule.forFeature([NavigationEffects])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class NavigationModule {}
