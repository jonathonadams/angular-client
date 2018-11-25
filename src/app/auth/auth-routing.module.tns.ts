import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const ROUTES: Routes = [{ path: 'login', pathMatch: 'full', component: LoginComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(ROUTES)],
  exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule {}
