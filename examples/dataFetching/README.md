# API calls

Most of our applications consume data from an API.
Therefore, making API calls is something you will come across with very often.

## Performing API calls with the useAPI hook

In the MWI React template, performing API calls can be done with the `useAPI` hook.
It will take care of

- Authentication
- Propper logging (@dlw/dlw-logger)
- Loading state
- Error state

There are 2 ways to fire an API call:

- Immediately when a component is mounted
- Whenever you want: a button click, wait for a condition to be fulfilled.

### Firing right away when a component is mounted

As shown in the `ExecuteImmediately` component:

If you want to execute an (authenticated) api call as soon as a component loads,
you can use the useAPI hook.

`const [todos, isTodosLoading, hasError] = useAPI('/api/template/todos');`

As input parameters, we pass the url of the API we want to call.
As result we get an array of 3 parameters:
`[data, loadingIndicator, errorIndicator]`
Because this is an array, we can name it whatever we want.
These parameters can be used in the render of your application.

The useAPI hook will fire the api as soon as this component renders.
The useAPI hook will cause a re-render as soon as one of the returnparameters changes.
The useAPI hook will take care of authentication.

### Firing whenever we want

As shown in the `ExecuteLater` component:
If you want to execute an (authenticated) api call, but not fire away directly,
you can also use the useAPI hook

`const [todos, isTodosLoading, hasError, fetchTodos] = useAPI( '/api/template/todos', false);`

Similar to the ExecuteImmediately component, we can call the useAPI hook
with the url of the API we want to call.
If we don't want to fire away directely, we can also pass the option 'fireImmediately: false'.

As result we get an array of 4 parameters:
`[data, loadingIndicator, errorIndicator, fetchFunction]`
Because this is an array, we can name it whatever we want.
These parameters can be used in the render of your application.
The fetchFunction argument is a function that will execute the API call as soon the function is called.

The useAPI hook will fire the api as soon as this component renders.
The useAPI hook will cause a re-render as soon as one of the returnparameters changes.
The useAPI hook will take care of authentication.
