import { useQuery } from 'react-query';
import { useEffect, useState, useMemo } from 'react';
import useTodos, { useTodosManual } from './useTodos';
import { getTodoById } from '../../services/todo.service';
import { themeState } from '../../state/atoms/theme.atom';
import { selector, useRecoilState } from 'recoil';
import { todosState } from '../../state/atoms/todos.atom';

// NOTE: this is an exmaple with manipulating an existing data set
// mimicking a memoised selector
export default function useTodoById(todoId) {
  const [todo, setTodo] = useState({});
  // Fetching data
  const { status, data, error, isFetching } = useTodos();

  // Manipulating data
  useEffect(() => {
    if (data && data.length) {
      setTodo(data.find(e => e.id === todoId));
    }
  }, [data, todoId]);

  // Returning data
  return { data: todo, status, error, isFetching };
}

// NOTE: this is an example with fetching the todo by id
export function useTodoByIdAPI(todoId) {
  return useQuery(['todo', todoId], getTodoById);
}
