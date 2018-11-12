import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule, AppMaterialModule } from '@app/shared';
import { todosReducers, TodoState } from './todos.reducer';
import { TodoEffects } from './todos.effects';
import { TodoService } from './todos.service';
import { TodosComponent } from './components/todos.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoRoutingModule } from './todos-routing.module';

const COMPONENTS = [TodosComponent, TodoListComponent, TodoDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    AppMaterialModule,
    TodoRoutingModule,
    StoreModule.forFeature<TodoState>('todos', todosReducers),
    EffectsModule.forFeature([TodoEffects])
  ],
  providers: [TodoService],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TodoModule {}
