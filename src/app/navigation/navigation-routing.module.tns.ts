import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ROUTES } from './common-navigation.routes';

@NgModule({
  imports: [NativeScriptRouterModule.forChild(ROUTES)],
  exports: [NativeScriptRouterModule]
})
export class NavigationRoutingModule {}
