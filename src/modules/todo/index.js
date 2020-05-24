import React from 'react';
import { TodoDetail } from './todoDetail';
import { TodoList } from './todoList';

export const TodoModule = props => {
  // TODO: display multiple instances of todoList -> getting data is responsibility of list
  // this should showcase that fetching data from api/global state is no problem
  const defaultTodoId = '6fc79d59-0d07-4b7c-84b7-01bc067cf3f1';
  return (
    <div>
      <TodoDetail todoId={defaultTodoId} />
      <TodoList />
    </div>
  );
};
