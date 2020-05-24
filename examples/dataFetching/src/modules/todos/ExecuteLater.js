import React from 'react';
import useAPI from '../../hooks/useAPI';

export default () => {
  /* 
      If you want to execute an (authenticated) api call, but not fire away directly,
      you can also use the useAPI hook (see the ExecuteImmediately component)
  
      Similar to the ExecuteImmediately component, we can call the useAPI hook
      with the url of the API we want to call.
      If we don't want to fire away directely, we can also pass the option 'fireImmediately: false'.
  
      As result we get an array of 4 parameters:
      [data, loadingIndicator, errorIndicator, fetchFunction].
      Because this is an array, we can name it whatever we want.
      These parameters can be used in the render of your application.
      The fetchFunction argument is a function that will execute the API call as soon the function is called.
  
      The useAPI hook will fire the api as soon as this component renders.
      The useAPI hook will cause a re-render as soon as one of the returnparameters changes.
      The useAPI hook will take care of authentication.
    */

  // call the useAPI hook with the url + fireImmediately: false option.
  // Destructure it's return value.
  // Here, we want to call it todos, isTodosLoading & hasError.
  const [todos, isTodosLoading, hasError, fetchTodos] = useAPI({ 
    url: '/api/template/todos',
    immediately: false,
  });

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
      <button onClick={fetchTodos}> Get me some todos</button>
      <div>
        {todos &&
          todos.map(todo => (
            <div key={todo.id}>
              {todo.id} - {todo.title}
            </div>
          ))}
      </div>
    </>
  );
};
