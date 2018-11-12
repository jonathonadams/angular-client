import { Todo } from './todos.model';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoActionTypes, TodoActionUnion } from './todos.actions';

const COMPARATOR = 'id';

export interface TodoState {
  todos: Todo[];
}

export function todosReducer(state: Todo[] = [], action: TodoActionUnion): Todo[] {
  switch (action.type) {
    case TodoActionTypes.LoadSuccess:
      return <Todo[]>action.payload;

    case TodoActionTypes.CreateSuccess:
      return <Todo[]>[...state, action.payload];

    case TodoActionTypes.UpdateSuccess:
      return <Todo[]>state.map(todo => {
        return todo[COMPARATOR] === action.payload[COMPARATOR]
          ? Object.assign({}, todo, action.payload)
          : todo;
      });

    case TodoActionTypes.Delete:
      return <Todo[]>state.filter(todo => {
        return todo[COMPARATOR] !== action.payload[COMPARATOR];
      });

    default:
      return state;
  }
}

// a map of the todos reducers
export const todosReducers: ActionReducerMap<TodoState> = {
  todos: todosReducer
};

// Select the top level 'todos' state.
export const selectTodoState = createFeatureSelector<TodoState>('todos');

// todo sub state selectors
export const selectTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);
