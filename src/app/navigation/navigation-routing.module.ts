import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ROUTES } from './common-navigation.routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {}
