import { useQuery } from 'react-query';
import { getTodos } from '../../services/todo.service';
import { useRecoilState } from 'recoil';
import { todosState } from '../../state/atoms/todos.atom';

export default function useTodos() {
  const [todoState, setTodosState] = useRecoilState(todosState);
  return useQuery(['todos'], getTodos, {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      // Set fetched todos in atom
      setTodosState(data);
    },
  });
}

export function useTodosManual() {
  return useQuery(['todos'], getTodos, {
    refetchOnWindowFocus: false,
    manual: true,
    initialData: [],
  });
}
