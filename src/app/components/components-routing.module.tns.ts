import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class ComponentsRoutingModule {}
