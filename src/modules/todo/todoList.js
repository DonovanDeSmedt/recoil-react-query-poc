import React from 'react';
import useTodos from '../../hooks/todo/useTodos';
import useToggleTodo from '../../hooks/todo/useToggleTodo';

export const TodoList = props => {
  const { data: todos, isFetching, error } = useTodos();

  const [
    handleToggle,
    { status: mutatationStatus, error: mutationError, reset },
  ] = useToggleTodo();

  const toggleTodo = (todo, isActive) => {
    // update todo via API
    handleToggle({ ...todo, active: isActive });
  };

  // no data
  if (!todos || !todos.length) {
    return <div>No data to be displayed</div>;
  }

  return (
    <div>
      <h2>Todo list</h2>
      {(isFetching || mutatationStatus === 'loading') && <div>Loading</div>}
      {!isFetching &&
        todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '1em',
            }}>
            <input
              type="checkbox"
              checked={todo.active}
              onChange={e => toggleTodo(todo, e.target.checked)}></input>
            <div>{todo.text}</div>
          </div>
        ))}
    </div>
  );
};
