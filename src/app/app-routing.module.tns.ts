import { NgModule, ModuleWithProviders } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [NativeScriptRouterModule]
})
export class RootAppRoutingModule {}

@NgModule()
export class AppRoutingModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAppRoutingModule,
      providers: []
    };
  }
}
