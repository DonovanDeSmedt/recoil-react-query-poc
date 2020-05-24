import React from 'react';

export default ({ todo }) => (
  <div>
    {todo.id === 4 ? (
      <>{todo.id.test.swag}</>
    ) : (
      <>
        {todo.id} - {todo.title}
      </>
    )}
  </div>
);
