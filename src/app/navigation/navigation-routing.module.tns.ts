import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { NavigationComponent } from '@nav/components/navigation.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    // Currently the NativeScriptRouterModule does not support the resolve functionality?
    // resolve: {
    //   user: UserResolver
    // },
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
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(ROUTES)],
  exports: [NativeScriptRouterModule]
})
export class NavigationRoutingModule {}
