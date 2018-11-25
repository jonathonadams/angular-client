import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@auth/guards/auth.guard';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'todos',
        loadChildren: '../features/todos/todos.module#TodoModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class NavigationRoutingModule {}
