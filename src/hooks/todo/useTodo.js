import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import useTodos from './useTodos';
import { getTodoById } from '../../services/todo.service';

// NOTE: this is an exmaple with manipulating an existing data set
// mimicking a memoised selector
export default function useTodoById(todoId) {
  const [todo, setTodo] = useState({});
  // Fetching data
  const { status, data, error, isFetching, refetch } = useTodos();

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
