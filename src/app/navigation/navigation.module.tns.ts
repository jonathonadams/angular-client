import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NavigationComponent } from './navigation.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const COMPONENTS = [NavigationComponent, MobileMenuComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NavigationModule {}
