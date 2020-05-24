import React from 'react';
import useAPI from '../../hooks/useAPI';

export default () => {
  /* 
      If you want to execute an (authenticated) api call as soon as a component loads,
      you can use the useAPI hook.
  
      As input parameters, we pass the url of the API we want to call.
      As result we get an array of 3 parameters:
      [data, loadingIndicator, errorIndicator].
      Because this is an array, we can name it whatever we want.
      These parameters can be used in the render of your application.
  
      The useAPI hook will fire the api as soon as this component renders.
      The useAPI hook will cause a re-render as soon as one of the returnparameters changes.
      The useAPI hook will take care of authentication.
    */

  // call the useAPI hook with the url & destructure it's return value.
  // Here, we want to call it todos, isTodosLoading & hasError.
  const [todos, isTodosLoading, hasError] = useAPI({ url: '/api/template/todos' });

  // We can use the isTodosLoading parameter directly in the render function.
  if (isTodosLoading) {
    return 'Loading...';
  }

  // Same for the hasError parameter
  if (hasError) {
    return 'Something went wrong.';
  }

  // If the application is not loading & nothing went wrong,
  // render whatever you want to render with the data returned from the API
  return (
    <>
      {todos &&
        todos.map(todo => (
          <div key={todo.id}>
            {todo.id} - {todo.title}
          </div>
        ))}
    </>
  );
};
