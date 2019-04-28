import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule, AppMaterialModule } from '@app/shared';
import { TodosEntityState, todosReducer } from './reducers/todos.reducer';
import { TodoEffects } from './effects/todos.effects';
import { TodosService } from './services/todos.service';
import { TodosComponent } from './components/todos.component';
import { TodoListComponent } from './components/all-todos/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoRoutingModule } from './todos-routing.module';
import { TodosFacade } from './services/todos.facade';
import { AllTodosComponent } from './components/all-todos/all-todos.component';

const COMPONENTS = [TodosComponent, AllTodosComponent, TodoListComponent, TodoDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    AppMaterialModule,
    TodoRoutingModule,
    StoreModule.forFeature<TodosEntityState>('todosState', todosReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  providers: [TodosService, TodosFacade],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TodoModule {}
