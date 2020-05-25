import React, { useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import useTodoById, { useTodoByIdQuery } from '../../hooks/todo/useTodo';
import useCreateTodo from '../../hooks/todo/useCreateTodo';
import { themeState } from '../../state/atoms/theme.atom';
import { todoByIdQuery } from '../../state/selectors/todo.selector';

export const TodoDetail = props => {
  const [todoText, setTodoText] = useState('');

  const { data, isFetching, error } = useTodoById(props.todoId);
  const [create, { status, error: createError, reset }] = useCreateTodo();
  const theme = useRecoilValue(themeState);

  // FIXME: this will work once recoil v0.0.8 is released
  // this is a variant for useTodoById but by using Recoil
  // const selectedTodo = useRecoilValueLoadable(todoByIdQuery(props.todoId));

  const handleCreateTodo = () => {
    // create todo via API
    create(todoText);
    setTodoText('');
  };

  return (
    <div>
      <h2>Todo creator</h2>
      <span>
        First {theme} todo is {data.active ? 'checked' : 'unchecked'}
      </span>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          onChange={e => setTodoText(e.target.value)}
          value={todoText}></input>
        <button onClick={handleCreateTodo}>Add new todo</button>
      </div>
    </div>
  );
};
