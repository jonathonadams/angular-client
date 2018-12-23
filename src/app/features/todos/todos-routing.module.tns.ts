import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos.component';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
  { path: '/:id', component: TodosComponent },
  { path: '', pathMatch: 'full', component: TodosComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class TodoRoutingModule {}
