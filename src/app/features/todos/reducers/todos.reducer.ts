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
  allTodoFilterString: string | null;
}

// 2. Create entity adapter
const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

// 3. Define the initial state
export const initialState: TodosEntityState = adapter.getInitialState({
  selectedTodoId: null,
  allTodoFilter: TodoFilterStatus.InCompleted,
  allTodoFilterString: null
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

    case TodoActionTypes.SelectFilter:
      return { ...state, allTodoFilter: action.payload };

    case TodoActionTypes.SearchFilter:
      return { ...state, allTodoFilterString: action.payload };

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

export const selectTodoSearchString = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.allTodoFilterString
);

export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => todoEntities[todoId]
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodoFilterSelection,
  selectTodoSearchString,
  (todos: Todo[], selection: TodoFilterStatus, searchString: string | null) => {
    if (selection === TodoFilterStatus.All) {
      if (searchString === null || searchString === '') {
        return todos;
      } else {
        return todos.filter(todo => isTodoInSearchString(todo, searchString));
      }
    } else if (selection === TodoFilterStatus.Completed) {
      if (searchString === null || searchString === '') {
        return todos.filter(todo => todo.completed === true);
      } else {
        return todos.filter(
          todo => todo.completed === true && isTodoInSearchString(todo, searchString)
        );
      }
    } else if (selection === TodoFilterStatus.InCompleted) {
      if (searchString === null || searchString === '') {
        return todos.filter(todo => todo.completed === false);
      } else {
        return todos.filter(
          todo => todo.completed === false && isTodoInSearchString(todo, searchString)
        );
      }
    }
  }
);

export const selectUserTodos = createSelector(
  selectAuthenticatedUser,
  selectAllTodos,
  (user: User, todos: Todo[]) => {
    return user && todos ? todos.filter(todo => todo.user === user.id) : [];
  }
);

function isTodoInSearchString(todo: Todo, searchString: string): boolean {
  if (
    todo.title.toLowerCase().includes(searchString) ||
    todo.description.toLowerCase().includes(searchString)
  ) {
    return true;
  } else {
    return false;
  }
}
