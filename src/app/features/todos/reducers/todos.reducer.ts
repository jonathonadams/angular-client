import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Todo } from '../models/todos.model';
import { TodoActionTypes, TodoActionUnion } from '../actions/todos.actions';
import { selectUser, User } from '../../users';

// 1. define teh entity state
export interface TodosEntityState extends EntityState<Todo> {
  // Add custom property state
  selectedTodoId: string | null;
}

// 2. Create entity adapter
const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

// 3. Define the initial state
export const initialState: TodosEntityState = adapter.getInitialState({
  selectedTodoId: null
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

const { selectIds, selectEntities, selectAll } = adapter.getSelectors(selectTodoState);

export const selectTodoIds = selectIds;
export const selectTodoEntities = selectEntities;
export const selectAllTodos = selectAll;
export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.selectedTodoId
);
export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => todoEntities[todoId]
);

export const selectUserTodos = createSelector(
  selectUser,
  selectAllTodos,
  (user: User, todos) => {
    return user && todos ? todos.filter(todo => todo.userId === user.id) : [];
  }
);
