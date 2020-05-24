import { useQuery } from 'react-query';
import axios from 'axios';

const getTodos = async (_, postId) => {
  const { data } = await axios.get(
    `https://json-mock-data-server.herokuapp.com/todos`,
  );
  return data;
};

export default function useTodos() {
  return useQuery(['todos'], getTodos, { refetchOnWindowFocus: false });
}
