// A reducer is just a pure function, it takes inputs and return a value when called
// Because it is pure function we do not need to configure any of angular testing
// module because it does not need of angular configuration to operate.
// We can also just use snapshot testing to test the output of the function
// and not need to use assertion testing
import { todosReducer } from './todos.reducer';
import { Todo } from '@app/features/todos';
import {
  LoadTodosSuccess,
  CreateTodoSuccess,
  UpdateTodoSuccess,
  DeleteTodoSuccess
} from './todos.actions';

describe('TodoReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = todosReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadSuccess', () => {
    it('should add the todos to the todo state', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: 2,
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      const action = new LoadTodosSuccess(todos);
      const result = todosReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('CreateSuccess', () => {
    it('should add a todo to the todo state', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'some title',
          description: 'some description',
          completed: true
        }
      ];

      const newTodo = {
        id: 2,
        title: 'another title',
        description: 'another description',
        completed: false
      };

      const action = new CreateTodoSuccess(newTodo);
      const result = todosReducer(todos, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateSuccess', () => {
    it('should update the todo state', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: 2,
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      const updateTodo = {
        id: 2,
        completed: true
      } as Todo;

      const action = new UpdateTodoSuccess(updateTodo);
      const result = todosReducer(todos, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteSuccess', () => {
    it('should delete the todo from the sate', () => {
      const todos: Todo[] = [
        {
          id: 1,
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: 2,
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      const todoToDelete = {
        id: 2
      } as Todo;

      const action = new DeleteTodoSuccess(todoToDelete);
      const result = todosReducer(todos, action);
      expect(result).toMatchSnapshot();
    });
  });
});
