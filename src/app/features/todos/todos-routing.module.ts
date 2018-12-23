import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './components/todos.component';

const routes: Routes = [
  { path: ':id', component: TodosComponent },
  { path: '', pathMatch: 'full', component: TodosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
