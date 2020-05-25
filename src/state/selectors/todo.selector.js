import { useQuery } from 'react-query';
import { themeState } from '../../state/atoms/theme.atom';
import { getTodos } from '../../services/todo.service';
import { selector } from 'recoil';

export const todosQuery = selector({
  key: 'Todos',
  get: async ({ get }) => {
    const todos = await getTodos();
    return todos;
  },
});

// NOTE: this code will work once recoil 0.0.8 is released
// export const todoByIdQuery = selectorFamily({
//   key: 'TodoById',
//   get: todoId => data => {
//     // get todos from atom state not from todosQuery, todosQuery will fetch them from API again
//     // successCallback of react query should put todos in atom
//     const todos = // get(todosQuery);
//     return todos.find(todo => todo.id === todoId);
//   },
// });
