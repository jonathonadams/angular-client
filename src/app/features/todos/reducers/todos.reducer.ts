import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Todo } from '../todos.model';
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
    case TodoActionTypes.LoadSuccess:
      return adapter.addAll(action.payload, state);

    case TodoActionTypes.CreateSuccess:
      return adapter.addOne(action.payload, state);

    case TodoActionTypes.UpdateSuccess:
      return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);

    case TodoActionTypes.Delete:
      return adapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}

// Select the top level 'todos' state.
export const selectTodoState = createFeatureSelector<TodosEntityState>('todosState');

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectTodoIds = createSelector(
  selectTodoState,
  selectIds
);
export const selectTodoEntities = createSelector(
  selectTodoState,
  selectEntities
);
export const selectAllTodos = createSelector(
  selectTodoState,
  selectAll
);

export const selectUserTodos = createSelector(
  selectUser,
  selectAllTodos,
  (user: User, todos) => {
    return user && todos ? todos.filter(todo => todo.userId === user.id) : [];
  }
);
