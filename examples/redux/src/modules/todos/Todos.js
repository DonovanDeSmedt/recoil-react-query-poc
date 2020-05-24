import React from 'react';
import useAPI from '../../hooks/useAPI';
import Todo from './Todo';
import ErrorBoundary from '../ui/error-boundary';

const Todos = ({ search }) => {
  const [todos, isTodosLoading, hasError, fetchTodos] = useAPI(
    '/api/template/todos',
    false,
  );

  if (hasError) {
    return 'Error occured';
  }

  return (
    <>
      <h2>MY AWESOME APP</h2>
      <button onClick={search} disabled={isTodosLoading}>
        Get me some todos
      </button>
      <div>
        {isTodosLoading && <>Loading....</>}
        {!isTodosLoading &&
          todos &&
          todos.map(todo => (
            <ErrorBoundary message="Oh snap, our todo crashed" key={todo.id}>
              <Todo todo={todo} />
            </ErrorBoundary>
          ))}
      </div>
    </>
  );
};

export default Todos;
