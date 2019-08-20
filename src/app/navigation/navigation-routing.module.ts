import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavigationComponent } from '@nav/components/navigation.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { UserResolver } from '~/app/features/users/services/user-resolver.service';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { UserProfileComponent } from '../features/users/components/user-profile/user-profile.component';
import { UsersNavigationComponent } from '../features/users/components/users-navigation/users-navigation.component';
import { UsersComponent } from '../features/users/components/users.component';

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
        loadChildren: () =>
          import('../features/todos/todos.module').then(m => m.TodoModule)
      },
      // Move this to a UsersRoutingModule when angular supports a 'loadModuleRoutes' or something that is not lazy loaded
      {
        path: 'users',
        component: UsersComponent,
        children: [{ path: 'profile', component: UserProfileComponent }]
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
