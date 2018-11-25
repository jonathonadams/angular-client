import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavigationComponent } from '@nav/navigation.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { UserResolver } from '@features/users/user-resolver.service';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

export const ROUTES: Routes = [
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
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {}
