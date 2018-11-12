import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
