import React, { useState } from 'react';
import useTodos from '../../hooks/todo/useTodos';
import useTodoById from '../../hooks/todo/useTodo';
import useCreateTodo from '../../hooks/todo/useCreateTodo';

export const TodoDetail = props => {
  const [todoText, setTodoText] = useState('');
  const { data, isFetching, error } = useTodoById(props.todoId);
  const [create, { status, error: createError, reset }] = useCreateTodo();

  const handleCreateTodo = () => {
    // create todo via API
    create(todoText);
    setTodoText('');
  };

  return (
    <div>
      <h2>Todo creator</h2>
      <span>First todo is {data.active ? 'checked' : 'unchecked'}</span>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          onChange={e => setTodoText(e.target.value)}
          value={todoText}></input>
        <button onClick={handleCreateTodo}>Add new todo</button>
      </div>
    </div>
  );
};
