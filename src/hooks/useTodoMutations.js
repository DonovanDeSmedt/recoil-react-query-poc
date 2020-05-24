import { useMutation, queryCache } from 'react-query';
import axios from 'axios';

export const toggleTodo = async newTodo => {
  const { data } = await axios.put(
    `https://json-mock-data-server.herokuapp.com/todos/${newTodo.id}`,
    newTodo,
  );
  return data;
};

// by creating an optimistic mutation, refetching of data is not required
export const optimisticTodoMutation = newTodo => {
  //   Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  queryCache.cancelQueries('todos');

  // Snapshot the previous value
  const previousTodos = queryCache.getQueryData('todos');

  // Optimistically update to the new value
  queryCache.setQueryData('todos', prevTodos => {
    const todoIndex = prevTodos.findIndex(e => e.id === newTodo.id);
    const updatedTodos = [
      ...prevTodos.slice(0, todoIndex),
      newTodo,
      ...prevTodos.slice(todoIndex + 1),
    ];
    return updatedTodos;
  });

  // Return the snapshotted value
  return () => queryCache.setQueryData('todos', previousTodos);
};

export function useToggleTodo() {
  return useMutation(toggleTodo, {
    onMutate: optimisticTodoMutation,
    onSuccess: (data, variables) => {
      // optional: refetch data on success. Might be required when list is simultaneously used by many people
      // queryCache.refetchQueries('todos');
    },
    onError: (error, newTodo, rollback) => {
      console.log('error', error);
      console.log(newTodo);
      return rollback();
    },
  });
}
