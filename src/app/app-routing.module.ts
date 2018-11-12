import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
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
