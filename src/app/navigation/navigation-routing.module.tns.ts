import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NavigationComponent } from '@nav/navigation.component';
import { TodosComponent } from '@features/todos/components/todos.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

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
        component: TodosComponent
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
