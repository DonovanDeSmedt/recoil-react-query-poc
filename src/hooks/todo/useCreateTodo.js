import { useQuery, useMutation, queryCache } from 'react-query';
import { uuidv4 } from '../../utils/functions';
import { createTodo } from '../../services/todo.service';

export default function useCreateTodo() {
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
