import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@auth/guards/auth.guard';
import { NavigationComponent } from './navigation.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { UserResolver } from '../features/users/user-resolver.service';

// canLoad: [AuthGuard],
// canActivateChild: [AuthGuard],

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver
    },
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
export class NavigationRoutingModule {}
