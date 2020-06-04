import { useQuery } from 'react-query';
import { getTodos } from '../../services/todo.service';
import { selector, selectorFamily } from 'recoil';
import { todosState } from '../atoms/todos.atom';

export const todoByIdQuery = selectorFamily({
  key: 'TodoById',
  get: todoId => ({ get }) => {
    const todos = get(todosState);
    return (todos || []).find(todo => todo.id === todoId);
  },
});
