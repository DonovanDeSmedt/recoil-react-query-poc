import { useQuery, useMutation, queryCache } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useTodos from './useTodos';
import { uuidv4 } from '../utils/functions';

// API functions
const getTodoById = async (_, todoId) => {
  const { data } = await axios.get(
    `https://json-mock-data-server.herokuapp.com/todos/${todoId}`,
  );
  return data;
};

const createTodo = async todo => {
  const { data } = await axios.post(
    'https://json-mock-data-server.herokuapp.com/todos',
    todo,
  );
  return data;
};

// NOTE: this is an exmaple with manipulating an existing data set
// mimicking a memoised selector
export function useTodoById(todoId) {
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
// export default function useTodo(todoId) {
//   return useQuery(['todo', todoId], getTodoById);
// }

export function useCreateTodo() {
  const mutationResult = useMutation(createTodo, {
    onMutate: newTodo => {
      // Snapshot the previous value
      const previousTodos = queryCache.getQueryData('todos');
      // add newly created todo to global state (cache)
      queryCache.setQueryData('todos', prevTodos => [...prevTodos, newTodo]);
      // Return the snapshotted value
      return () => queryCache.setQueryData('todos', previousTodos);
    },
    onError: (error, newTodo, rollback) => {
      return rollback();
    },
  });

  const [mutate, mutationOptions] = mutationResult;

  const create = text => {
    const newTodo = { active: false, id: uuidv4(), text };
    mutate(newTodo);
  };

  return [create, mutationOptions];
}
