import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NavigationComponent } from './navigation.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NavigationRoutingModule } from './navigation-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './effects/navigation.effects';

const COMPONENTS = [NavigationComponent, MobileMenuComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NavigationRoutingModule,
    EffectsModule.forFeature([NavigationEffects])
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NavigationModule {}
