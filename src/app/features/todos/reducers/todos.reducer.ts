import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Todo, TodoFilterStatus } from '../models/todos.model';
import { TodoActionTypes, TodoActionUnion } from '../actions/todos.actions';
import { User, selectAuthenticatedUser } from '../../users';

// 1. define the entity state
export interface TodosEntityState extends EntityState<Todo> {
  // Add custom property state
  selectedTodoId: string | null;
  allTodoFilter: TodoFilterStatus;
}

// 2. Create entity adapter
const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

// 3. Define the initial state
export const initialState: TodosEntityState = adapter.getInitialState({
  selectedTodoId: null,
  allTodoFilter: TodoFilterStatus.InCompleted
});

// export const initialState: Todo[] = [];

export function todosReducer(
  state: TodosEntityState = initialState,
  action: TodoActionUnion
): TodosEntityState {
  switch (action.type) {
    case TodoActionTypes.Select:
      return { ...state, selectedTodoId: action.payload };

    case TodoActionTypes.ClearSelected:
      return { ...state, selectedTodoId: null };

    case TodoActionTypes.UpdateFilter:
      return { ...state, allTodoFilter: action.payload };

    case TodoActionTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);

    case TodoActionTypes.CreateSuccess:
      return adapter.addOne(action.payload, state);

    case TodoActionTypes.UpdateSuccess:
      return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);

    case TodoActionTypes.DeleteSuccess:
      return adapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}

// Select the top level 'todos' state.
export const selectTodoState = createFeatureSelector<TodosEntityState>('todosState');

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos
} = adapter.getSelectors(selectTodoState);

export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.selectedTodoId
);

export const selectTodoFilterSelection = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.allTodoFilter
);

export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => todoEntities[todoId]
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodoFilterSelection,
  (todos: Todo[], selection: TodoFilterStatus) => {
    if (selection === TodoFilterStatus.All) {
      return todos;
    } else if (selection === TodoFilterStatus.Completed) {
      return todos.filter(todo => todo.completed === true);
    } else if (selection === TodoFilterStatus.InCompleted) {
      return todos.filter(todo => todo.completed === false);
    }
  }
);

export const selectUserTodos = createSelector(
  selectAuthenticatedUser,
  selectAllTodos,
  (user: User, todos: Todo[]) => {
    return user && todos ? todos.filter(todo => todo.userId === user.id) : [];
  }
);
