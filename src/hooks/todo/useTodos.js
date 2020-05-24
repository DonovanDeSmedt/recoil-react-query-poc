import { useQuery } from 'react-query';
import { getTodos } from '../../services/todo.service';

export default function useTodos() {
  return useQuery(['todos'], getTodos, { refetchOnWindowFocus: false });
}