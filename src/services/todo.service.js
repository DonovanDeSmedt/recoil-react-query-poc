import axios from 'axios';

// API constants
const baseUrl = 'https://json-mock-data-server.herokuapp.com/todos';
// API functions
export const createTodo = async todo => {
  const { data } = await axios.post(baseUrl, todo);
  return data;
};

export const toggleTodo = async newTodo => {
  const { data } = await axios.put(`${baseUrl}/${newTodo.id}`, newTodo);
  return data;
};

export const getTodoById = async (_, todoId) => {
  const { data } = await axios.get(`${baseUrl}/${todoId}`);
  return data;
};

export const getTodos = async (_, postId) => {
  const { data } = await axios.get(baseUrl);
  return data;
};
